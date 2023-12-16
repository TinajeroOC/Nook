import AppearanceContainer from '@/components/dashboard/AppearanceContainer'
import LinkTable from '@/components/dashboard/LinkTable'
import ProfileContainer from '@/components/dashboard/ProfileContainer'
import RedirectContainer from '@/components/dashboard/RedirectContainer'
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
    <div className='flex flex-col-reverse sm:grid sm:grid-cols-12 sm:gap-8'>
      <div className='col-start-1 col-end-8 flex flex-col md:col-end-9'>
        <LinkTable data={{ links, user: user.id }} />
      </div>
      <div className='col-start-8 col-end-13 flex flex-col gap-8 md:col-start-9'>
        <RedirectContainer data={user.username} />
        <ProfileContainer data={{ ...settings, name: user.name, username: user.username }} />
        <AppearanceContainer data={settings} />
      </div>
    </div>
  )
}
