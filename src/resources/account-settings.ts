/**
 * Account Settings API
 */

import type { HarnessClient } from '../client.js';

export interface AccountSetting {
  category: string;
  identifier: string;
  value: string | boolean | number;
  allowedValues?: unknown[];
}

export class AccountSettingsAPI {
  constructor(private client: HarnessClient) {}

  async list(): Promise<AccountSetting[]> {
    return this.client.get<AccountSetting[]>('/account-settings');
  }

  async update(identifier: string, value: string | boolean | number): Promise<AccountSetting> {
    return this.client.put<AccountSetting>(`/account-settings/${identifier}`, { value });
  }
}
