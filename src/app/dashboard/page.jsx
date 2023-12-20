import AppearanceContainer from '@/components/dashboard/AppearanceContainer'
import LinkTable from '@/components/dashboard/LinkTable'
import ProfileContainer from '@/components/dashboard/ProfileContainer'
import RedirectContainer from '@/components/dashboard/RedirectContainer'
import UsernameProvider from '@/components/dashboard/UsernameContext'
import { initPocketBaseServer } from '@/lib/pocketbase/initPocketBaseServer'

async function getUserData() {
  const pb = await initPocketBaseServer()
  return await pb
    .collection('users')
    .getOne(pb.authStore.model.id, { fields: 'id, username, email, name, avatar' })
}

async function getSettingsData() {
  const pb = await initPocketBaseServer()
  return await pb.collection('settings').getFirstListItem(`user="${pb.authStore.model.id}"`, {
    fields: 'id, user, theme, about, isNameVisible, useGradientBg',
  })
}

async function getLinksData() {
  const pb = await initPocketBaseServer()
  return await pb.collection('links').getFullList(`user="${pb.authStore.model.id}"`, {
    fields: 'id, user, title, description, url, isVisible',
  })
}

export default async function Page() {
  const [user, settings, links] = await Promise.all([
    getUserData(),
    getSettingsData(),
    getLinksData(),
  ])

  const data = { user, settings, links }

  return (
    <div className='flex flex-col-reverse sm:grid sm:grid-cols-12 sm:gap-8'>
      <div className='col-start-1 col-end-8 flex flex-col md:col-end-9'>
        <LinkTable data={data} />
      </div>
      <div className='col-start-8 col-end-13 flex flex-col gap-8 md:col-start-9'>
        <UsernameProvider defaultValue={data.user.username}>
          <RedirectContainer data={data} />
          <ProfileContainer data={data} />
          <AppearanceContainer data={data} />
        </UsernameProvider>
      </div>
    </div>
  )
}
