import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Tooltip,
} from '@nextui-org/react'
import { IconAt, IconExternalLink } from '@tabler/icons-react'

import CopyText from '@/components/common/CopyText'
import { themeClasses, themeGradients } from '@/lib/constants/theme'
import { initPocketBaseServer } from '@/lib/pocketbase/initPocketBaseServer'

export const dynamic = 'force-dynamic'

async function getUser(username) {
  const pb = await initPocketBaseServer(true)
  return await pb.collection('users').getFirstListItem(`username="${username}"`)
}

async function getSettings(username) {
  const pb = await initPocketBaseServer(true)
  return await pb.collection('settings').getFirstListItem(`user.username="${username}"`)
}

async function getLinks(username) {
  const pb = await initPocketBaseServer(true)
  return await pb.collection('links').getFullList({ filter: `user.username="${username}"` })
}

export default async function Page({ params }) {
  const { username } = params

  const [user, settings, links] = await Promise.all([
    getUser(username),
    getSettings(username),
    getLinks(username),
  ])

  return (
    <div className='flex flex-col items-center gap-8'>
      <Card fullWidth={true}>
        <CardBody
          className={`${
            settings.useGradientBg
              ? `bg-gradient-to-tr ${themeGradients[settings.theme]}`
              : themeClasses[settings.theme]
          }`}
        >
          <Avatar showFallback radius='md' className='h-36 w-36 text-large shadow-md' />
        </CardBody>
        <CardFooter className='flex flex-col items-start gap-2'>
          <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
            <h1 className='inline-flex items-center text-xl font-semibold'>
              <IconAt size='20' stroke='3' />
              {user.username}
            </h1>
            {settings.isNameVisible && (
              <h1 className='text-md font-semibold text-default-500'>{user.name}</h1>
            )}
          </div>
          {settings.about && <p className='break-all text-default-500'>{settings.about}</p>}
        </CardFooter>
      </Card>
      <Divider />
      <div className='flex w-full flex-col gap-4'>
        {links.map((link, index) => {
          if (link.isVisible) {
            return (
              <Card fullWidth={true} key={index}>
                <CardBody>
                  <div className='flex flex-row items-center justify-between gap-4'>
                    <div>
                      <span className='font-semibold'>{link.title}</span>
                      {link.description && (
                        <p className='overflow-clip break-all text-sm text-default-400'>
                          {link.description}
                        </p>
                      )}
                    </div>
                    <div className='flex flex-col gap-2 sm:flex-row'>
                      <Tooltip content='View Link' placement='top'>
                        <Button
                          isIconOnly
                          as={Link}
                          href={link.url}
                          isExternal={true}
                          className={`${themeClasses[settings.theme]}`}
                        >
                          <IconExternalLink size='20' />
                        </Button>
                      </Tooltip>
                      <CopyText label='Copy Link' placement='top' value={link.url} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            )
          }
        })}
      </div>
    </div>
  )
}
