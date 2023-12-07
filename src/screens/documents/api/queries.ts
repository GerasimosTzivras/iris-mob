import ApiClient from "../../../shared/api/client";

export default class DocumentQueries {
  private readonly client: ApiClient;
  constructor(client: ApiClient) {
    this.client = client;
  }

  public async getPendingDocuments(params: any): Promise<any> {
    const searchParams = new URLSearchParams(params).toString();
    return await this.client.get(`/documents/pending?${searchParams}`);
  }
  public async getActionDocuments(params: any): Promise<any> {
    const searchParams = new URLSearchParams(params).toString();
    return await this.client.get(`/documents/inbox/action?${searchParams}`);
  }

  public async getInfoDocuments(params: any): Promise<any> {
    const searchParams = new URLSearchParams(params).toString();
    return await this.client.get(`/documents/inbox/info?${searchParams}`);
  }

  public async getRejectedDocuments(params: any): Promise<any> {
    const searchParams = new URLSearchParams(params).toString();
    return await this.client.get(`/documents/outbox/rejected?${searchParams}`);
  }

  public async getInProgressDocuments(params: any): Promise<any> {
    const searchParams = new URLSearchParams(params).toString();
    return await this.client.get(
      `/documents/outbox/inprogress?${searchParams}`
    );
  }

  public async getDistributionDocuments(params: any): Promise<any> {
    const searchParams = new URLSearchParams(params).toString();
    return await this.client.get(
      `/documents/outbox/distribution?${searchParams}`
    );
  }
  public async getDocument(id: string): Promise<any> {
    return await this.client.get<any>(`/documents/${id}`);
  }
}
