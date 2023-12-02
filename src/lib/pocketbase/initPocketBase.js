import PocketBase from 'pocketbase'

class PocketBaseClient {
  constructor() {
    this.client = new PocketBase('http://127.0.0.1:8090');
  }

  async register(name, email, password) {
    return await this.client.collection('users').create({ name, email, password, passwordConfirm: password })
  }

  async login(email, password) {
    return await this.client.collection('users').authWithPassword(email, password)
  }

  async isLoggedIn(cookie) {
    if (!cookie) return false

    this.client.authStore.loadFromCookie(cookie || '')

    return this.client.authStore.isValid
  }

  async getUser(cookie) {
    if (!cookie) return null

    this.client.authStore.loadFromCookie(cookie || '')

    return this.client.authStore.model
  }
}

const pb = new PocketBaseClient()

export default pb