import { Button, Card, CardBody, Link } from '@nextui-org/react'
import { IconExternalLink } from '@tabler/icons-react'

import CopyText from '@/components/common/CopyText'
import AccountContainer from '@/components/dashboard/AccountContainer'
import AppearanceContainer from '@/components/dashboard/AppearanceContainer'
import LinkTable from '@/components/dashboard/LinkTable'
import ProfileContainer from '@/components/dashboard/ProfileContainer'
import { initPocketBaseServer } from '@/lib/pocketbase/initPocketBaseServer'

export default async function Page() {
  const pb = await initPocketBaseServer()
  const user = await pb
    .collection('users')
    .getOne(pb.authStore.model.id, { fields: 'id, username, email, name, avatar' })
  const settings = await pb.collection('settings').getFirstListItem(`user="${user.id}"`, {
    fields: 'id, user, theme, about, isNameVisible, useGradientBg',
  })
  const links = await pb.collection('links').getFullList(`user="${user.id}"`, {
    fields: 'id, user, thumbnail, title, description, url, isVisible',
  })

  return (
    <div className='flex flex-col gap-8'>
      <Card>
        <CardBody className='flex flex-col items-center justify-between gap-2 sm:flex-row'>
          <div className='flex w-full flex-row items-center justify-between sm:flex-col sm:items-start'>
            <h1 className='text-2xl'>Dashboard</h1>
          </div>
          <div className='flex w-full flex-row gap-2 sm:w-fit'>
            <Button
              as={Link}
              isExternal={true}
              href={`/${pb.authStore.model.username}`}
              color='primary'
              endContent={<IconExternalLink size='20' />}
              className='w-full sm:w-fit'
            >
              View Nook
            </Button>
            <CopyText
              label='Copy Link'
              placement='bottom-end'
              value={`/${pb.authStore.model.username}`}
              isSiteUrl={true}
            />
          </div>
        </CardBody>
      </Card>
      <div className='flex flex-col-reverse sm:grid sm:grid-cols-12 sm:gap-8'>
        <div className='col-start-1 col-end-8 flex flex-col md:col-end-9'>
          <LinkTable data={{ links, user: user.id }} />
        </div>
        <div className='col-start-8 col-end-13 flex flex-col md:col-start-9'>
          <AccountContainer data={user} />
          <ProfileContainer data={{ ...settings, name: user.name, username: user.username }} />
          <AppearanceContainer data={settings} />
        </div>
      </div>
    </div>
  )
}
