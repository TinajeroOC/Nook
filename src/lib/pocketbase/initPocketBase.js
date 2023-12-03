import PocketBase from 'pocketbase'

class PocketBaseClient {
  constructor() {
    this.client = new PocketBase(process.env.PB_URL)
  }

  async register(name, email, password) {
    return await this.client
      .collection('users')
      .create({ name, email, password, passwordConfirm: password })
  }

  async authenticate(email, password) {
    return await this.client.collection('users').authWithPassword(email, password)
  }

  isAuthenticated(cookie) {
    if (!cookie) return false

    this.client.authStore.loadFromCookie(cookie)

    return this.client.authStore.isValid
  }

  getAuthUser(cookie) {
    if (!cookie) return null

    this.client.authStore.loadFromCookie(cookie)

    return this.client.authStore.model
  }

  async getUser(username) {
    await pb.client.admins.authWithPassword(
      process.env.PB_ADMIN_EMAIL,
      process.env.PB_ADMIN_PASSWORD
    )

    return await pb.client.collection('users').getFirstListItem(`username="${username}"`, {
      expand: 'profile, profile.items',
    })
  }
}

const pb = new PocketBaseClient()

export default pb
