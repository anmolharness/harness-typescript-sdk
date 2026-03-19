/**
 * Account Data Sinks API
 */

import type { HarnessClient } from '../client.js';

export interface DataSink {
  identifier: string;
  name: string;
  type: 'S3' | 'GCS' | 'AZURE_BLOB';
  config: unknown;
  enabled?: boolean;
}

export class AccountDataSinksAPI {
  constructor(private client: HarnessClient) {}

  async list(): Promise<DataSink[]> {
    return this.client.get<DataSink[]>('/account-data-sinks');
  }

  async create(data: Partial<DataSink>): Promise<DataSink> {
    return this.client.post<DataSink>('/account-data-sinks', data);
  }

  async delete(identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/account-data-sinks/${identifier}`);
  }
}
