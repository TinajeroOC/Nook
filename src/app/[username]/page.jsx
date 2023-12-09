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
import { IconExternalLink } from '@tabler/icons-react'

import CopyText from '@/components/common/CopyText'
import { themeClasses, themeGradients } from '@/lib/constants/theme'
import { initPocketBaseServer } from '@/lib/pocketbase/initPocketBaseServer'

export const dynamic = 'force-dynamic'

export default async function Page({ params }) {
  const pb = await initPocketBaseServer(true)
  const user = await pb.collection('users').getFirstListItem(`username="${params.username}"`)
  const settings = await pb.collection('settings').getFirstListItem(`user="${user.id}"`)
  const links = await pb.collection('links').getFullList({ filter: `user="${user.id}"` })

  return (
    <>
      <div className='flex flex-col items-center gap-8'>
        <Card fullWidth={true}>
          <CardBody
            className={`${
              settings.useGradientBg
                ? `bg-gradient-to-tr ${themeGradients[settings.theme]}`
                : themeClasses[settings.theme]
            }`}
          >
            <Avatar radius='lg' name={user.name} className='h-36 w-36 text-large shadow-md' />
          </CardBody>
          <CardFooter className='flex flex-col items-start gap-2'>
            <h1 className='text-xl font-semibold'>
              {settings.isNameVisible ? user.name : `@${user.username}`}
            </h1>
            {settings.bio && (
              <div>
                <span className='font-semibold'>Bio</span>
                <p className='break-all text-sm text-default-400'>{settings.bio}</p>
              </div>
            )}
            {settings.status && (
              <div>
                <span className='font font-semibold'>Status</span>
                <p className='break-all text-sm text-default-400'>{settings.status}</p>
              </div>
            )}
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
    </>
  )
}
