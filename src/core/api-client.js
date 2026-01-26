export class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async get(endpoint) {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Ошибка при запросе к ${url}:`, error)
      throw error
    }
  }
}
