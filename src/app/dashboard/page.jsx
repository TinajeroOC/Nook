import { AppearanceCard } from '@/components/cards/AppearanceCard'
import { ProfileCard } from '@/components/cards/ProfileCard'
import { RedirectCard } from '@/components/cards/RedirectCard'
import { LinkTable } from '@/components/tables/LinkTable'
import { initPocketBaseServer } from '@/lib/pocketbase/server'
import { UsernameProvider } from '@/providers/UsernameProvider'

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
    <div className='flex flex-col-reverse gap-8 sm:grid sm:grid-cols-12'>
      <div className='col-start-1 col-end-8 flex flex-col md:col-end-9'>
        <LinkTable user={user} links={links} />
      </div>
      <div className='col-start-8 col-end-13 flex flex-col gap-8 md:col-start-9'>
        <UsernameProvider defaultValue={data.user.username}>
          <RedirectCard data={data} />
          <ProfileCard data={data} />
          <AppearanceCard data={data} />
        </UsernameProvider>
      </div>
    </div>
  )
}
