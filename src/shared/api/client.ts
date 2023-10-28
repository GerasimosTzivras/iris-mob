
const API_URI = 'http://localhost:5002/iris/api'
const API_VERSION = 'v2'

//const FILES_URI = import.meta.env.VITE_IRIS_FILES_API
//const TIMEOUT = 30 * 1000
//const UPLOAD_TIMEOUT = 10 * 60 * 1000

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

class ApiClient {
  private readonly baseUrl = API_VERSION ? `${API_URI}/${API_VERSION}` : API_URI
  private readonly headers: any

  constructor(token: string, department: number, duty: number) {
    if (!token)
      throw new Error('Cannot initialize an Iris API Client with no token')

    if (duty === 0) {
      //coordinatorDutyId
      if (!department)
        throw new Error('Cannot initialize an Iris API Client with no profile')
    } else {
      if (!department && !duty)
        throw new Error('Cannot initialize an Iris API Client with no profile')
    }

    this.headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-profile': `${department}-${duty}`
    }
  }

  public static Delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms))
  }

  public async get<T>(
    path: string,
    delayMs?: number
  ): Promise<T> {
    if (delayMs) await ApiClient.Delay(delayMs)
    return await this.handleQuery(path)
    //return await this.handleRequest('get', path)
  }

  public async post(path: string, data: any) {
    if (!data) return
    return await this.handleRequest('post', path, data)
  }

  public async put(path: string, data: any) {
    if (!data) return
    return await this.handleRequest('put', path, data)
  }

  public async delete(path: string) {
    return await this.handleRequest('delete', path)
  }

  public async upload(path: string, data: FormData) {
    throw new Error('Not implemented')
  }

  public async download(path: string, params?: any) {
    return await this.handleDownload(path)
  }

  // TODO: implement cancellable requests
  private buildRequest(method: HttpMethod, path: string, data?: any) {
    const controller = new AbortController()
    const signal = controller.signal

    const init: RequestInit = {
      method: method,
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined,
      signal
    }

    return {
      abort: () => controller.abort(),
      ready: fetch(`${this.baseUrl}${path}`, init).then()
    }
  }

  private async handleQuery<T>(path: string): Promise<T> {
    const init: RequestInit = {
      method: 'get',
      headers: this.headers
    }

    const response = await fetch(`${this.baseUrl}${path}`, init)
    
    if (response.status === 401) {
      localStorage.clear()
      window.location.reload()
    }

    const json = await response.json()

    if (!response.ok) throw new Error(`${json.title}`)

    return json
  }

  private async handleDownload(path: string): Promise<Blob> {
    const headers = {
      Authorization: this.headers['Authorization'],
      'x-profile': this.headers['x-profile']
    }
    const init: RequestInit = {
      method: 'get',
      headers: headers
    }

    const response = await fetch(`${this.baseUrl}${path}`, init)

    if (!response.ok) {
      const json = await response.json()
      throw new Error(json.title)
    }

    const blob = await response.blob()

    return blob
  }

  private async handleRequest(method: HttpMethod, path: string, data?: any) {
    const init: RequestInit = {
      method: method,
      headers: this.headers,
      body: data ? JSON.stringify(data) : undefined
    }

    const response = await fetch(`${this.baseUrl}${path}`, init)

    if (response.status === 401) {
      localStorage.clear()
      window.location.reload()
    }

    const json = await response.json()
    if (!response.ok) throw new Error(`${json.title}`)

    return json
  }
}

export default ApiClient
