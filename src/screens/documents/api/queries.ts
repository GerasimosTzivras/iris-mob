import ApiClient from "../../../shared/api/client";

export default class DocumentQueries {
  private readonly client: ApiClient;
  constructor(client: ApiClient) {
    this.client = client;
  }

  public async getPendingDocuments(): Promise<any> {
    return await this.client.get(`/documents/pending`);
  }
}
