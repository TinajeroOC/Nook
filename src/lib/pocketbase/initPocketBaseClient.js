import Cookies from 'js-cookie'
import PocketBase from 'pocketbase'

let pb = null

export function getPocketBaseClient() {
  const initPocketBaseClient = () => {
    return new PocketBase(process.env.NEXT_PUBLIC_PB_URL)
  }

  const _pb = pb ?? initPocketBaseClient()

  if (!pb) pb = _pb

  const cookie = Cookies.get('pb_auth')

  pb.authStore.loadFromCookie(cookie)

  pb.authStore.onChange(() => {
    Cookies.set('pb_auth', pb.authStore.exportToCookie())
  })

  return pb
}
