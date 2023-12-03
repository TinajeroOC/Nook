import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase'

export async function initPocketBaseServer(authAsAdmin = false) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL)

  const handleUserAuth = async () => {
    let response = NextResponse.next()

    const cookie = cookies().get('pb_auth')

    if (cookie) {
      pb.authStore.loadFromCookie(cookie.value)

      try {
        if (pb.authStore.isValid) {
          await pb.collection('users').authRefresh()
        }
      } catch (error) {
        pb.authStore.clear()
      }
    }

    pb.authStore.onChange(() => {
      response?.headers.set('set-cookie', pb.authStore.exportToCookie())
    })
  }

  const handleAdminAuth = async () => {
    await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASSWORD)
  }

  authAsAdmin ? await handleAdminAuth() : await handleUserAuth()

  return pb
}
