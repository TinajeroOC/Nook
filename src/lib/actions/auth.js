'use server'

import { cookies } from 'next/headers'

import { initPocketBaseServer } from '../pocketbase/initPocketBaseServer'

export async function createUser({ username, name, email, password }) {
  try {
    const pb = await initPocketBaseServer(true)

    const user = await pb.collection('users').create({
      username: username.toLowerCase(),
      name,
      email,
      password,
      passwordConfirm: password,
    })

    await pb.collection('settings').create({
      user: user.id,
      theme: 'blue',
      bio: `Nook Newcomer`,
      status: 'Lounging',
      isNameVisible: true,
      useGradientBg: true,
    })

    return user
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}

export async function authenticateUser({ email, password }) {
  const pb = await initPocketBaseServer(true)

  try {
    const auth = await pb.collection('users').authWithPassword(email, password)
    cookies().set('pb_auth', pb.authStore.exportToCookie())
    return auth
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}
