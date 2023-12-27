import Cookies from 'js-cookie'
import PocketBase from 'pocketbase'

let pocketBaseClient = null

export function getPocketBaseClient() {
  const initPocketBaseClient = () => {
    return new PocketBase(process.env.NEXT_PUBLIC_PB_URL)
  }

  const pb = pocketBaseClient ?? initPocketBaseClient()

  if (!pocketBaseClient) pocketBaseClient = pb

  const cookie = Cookies.get('pb_auth')

  pocketBaseClient.authStore.loadFromCookie(cookie)

  pocketBaseClient.authStore.onChange(() => {
    Cookies.set('pb_auth', pocketBaseClient.authStore.exportToCookie())
  })

  return pocketBaseClient
}
