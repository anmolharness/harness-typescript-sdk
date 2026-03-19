/**
 * Licenses API
 */

import type { HarnessClient } from '../client.js';
import type { License } from '../types/index.js';

export class LicensesAPI {
  constructor(private client: HarnessClient) {}

  async list(): Promise<License[]> {
    return this.client.get<License[]>('/licenses');
  }

  async get(moduleType: string): Promise<License> {
    return this.client.get<License>(`/licenses/${moduleType}`);
  }
}
