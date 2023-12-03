import Cookies from 'js-cookie'
import PocketBase from 'pocketbase'

export async function initPocketBaseClient() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL)

  const cookie = Cookies.get('pb_auth')

  pb.authStore.loadFromCookie(cookie)

  pb.authStore.onChange(() => {
    Cookies.set('pb_auth', pb.authStore.exportToCookie({ httpOnly: false }))
  })

  return pb
}
