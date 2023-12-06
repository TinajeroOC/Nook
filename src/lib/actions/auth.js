'use server'

import { cookies } from 'next/headers'

import { initPocketBaseServer } from '../pocketbase/initPocketBaseServer'

const blacklistedUsernames = ['login', 'signup', 'dashboard', 'help']

export async function createUser({ username, name, email, password }) {
  if (username in blacklistedUsernames)
    throw Error('Cannot create an account using a blacklisted username')

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
}

export async function authenticateUser({ email, password }) {
  const pb = await initPocketBaseServer(true)

  await pb.collection('users').authWithPassword(email, password)

  cookies().set('pb_auth', pb.authStore.exportToCookie())
}
