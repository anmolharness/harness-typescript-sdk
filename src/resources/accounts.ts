/**
 * Accounts API
 */

import type { HarnessClient } from '../client.js';

export interface Account {
  uuid: string;
  companyName: string;
  accountName: string;
  defaultExperience?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export class AccountsAPI {
  constructor(private client: HarnessClient) {}

  async get(): Promise<Account> {
    return this.client.get<Account>('/account');
  }

  async update(data: Partial<Account>): Promise<Account> {
    return this.client.put<Account>('/account', data);
  }
}
