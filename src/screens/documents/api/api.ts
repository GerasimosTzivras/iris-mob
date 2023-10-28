
import ApiClient from '../../../shared/api/client'
import DocumentQueries from './queries'

export default class DocumentsApi {
  private readonly client: ApiClient

  readonly queries: DocumentQueries

  constructor(token: string, department: number, duty: number) {
    this.client = new ApiClient(token, department, duty)
    this.queries = new DocumentQueries(this.client)
  }
}
