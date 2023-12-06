'use server'

import { cookies } from 'next/headers'

import { initPocketBaseServer } from '../pocketbase/initPocketBaseServer'

const blacklistedUsernames = ['login', 'signup', 'dashboard', 'help']

export async function createUser({ username, name, email, password }) {
  if (username in blacklistedUsernames)
    throw Error('Cannot create an account using a blacklisted username')

  const pb = await initPocketBaseServer(true)

  /**
   * Default settings record must use some unique use information (e.g username),
   * else PocketBase will try to use an existing record with the same field values.
   */
  const settings = await pb.collection('settings').create({
    theme: 'blue',
    bio: `${name} (@${username}), Nook Newcomer`,
    status: 'Lounging',
    isNameVisible: true,
    useGradientBg: true,
  })

  return await pb.collection('users').create({
    username: username.toLowerCase(),
    name,
    email,
    password,
    passwordConfirm: password,
    settings: settings.id,
  })
}

export async function authenticateUser({ email, password }) {
  const pb = await initPocketBaseServer(true)

  const result = await pb.collection('users').authWithPassword(email, password)

  cookies().set('pb_auth', pb.authStore.exportToCookie())

  return result
}
