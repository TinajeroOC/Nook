import { Card, CardBody, CardHeader, Link } from '@nextui-org/react'
import { IconAt } from '@tabler/icons-react'

import { ColorClasses, GradientClasses } from '@/lib/constants/theme'
import { initPocketBaseServer } from '@/lib/pocketbase/server'

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
        <CardHeader
          className={`${
            settings.useGradientBg
              ? `bg-gradient-to-tr ${GradientClasses[settings.theme]}`
              : ColorClasses[settings.theme]
          }`}
        />
        <CardBody className='flex flex-col items-start gap-2'>
          <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
            <h1 className='inline-flex items-center font-semibold'>
              <IconAt size='20' stroke='3' />
              {user.username}
            </h1>
            {settings.isNameVisible && (
              <span className='font-semibold text-default-500'>{user.name}</span>
            )}
          </div>
          {settings.about && <p className='break-all text-default-500'>{settings.about}</p>}
        </CardBody>
      </Card>
      <div className='flex w-full flex-col gap-4'>
        {links.map((link, index) => {
          if (link.isVisible) {
            return (
              <Card as={Link} isExternal href={link.url} fullWidth={true} key={index}>
                <CardBody>
                  <div className='flex flex-row items-center gap-2'>
                    <div>
                      <span>{link.title}</span>
                      {link.description && (
                        <p className='overflow-clip break-all text-sm text-default-500'>
                          {link.description}
                        </p>
                      )}
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
