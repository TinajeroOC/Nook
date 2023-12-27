'use server'

import { cookies } from 'next/headers'

import { initPocketBaseServer } from '@/lib/pocketbase/server'

export async function createUser(username, name, email, password) {
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
      about: 'Nook Newcomer',
      isNameVisible: true,
      useGradientBg: true,
    })

    return user
  } catch (error) {
    console.log(`There was an issue creating a user: ${error}`)
    throw error
  }
}

export async function authenticateUser(email, password) {
  try {
    const pb = await initPocketBaseServer(true)

    const user = await pb.collection('users').authWithPassword(email, password)

    cookies().set('pb_auth', pb.authStore.exportToCookie())

    return user
  } catch (error) {
    console.log(`There was an issue authenticating a user: ${error}`)
    throw error
  }
}
