/**
 * Audit Filters API
 */

import type { HarnessClient } from '../client.js';
import type { Filter } from '../types/index.js';

export class AuditFiltersAPI {
  constructor(private client: HarnessClient) {}

  async list(): Promise<Filter[]> {
    return this.client.get<Filter[]>('/audit/api/filters');
  }

  async create(data: Partial<Filter>): Promise<Filter> {
    return this.client.post<Filter>('/audit/api/filters', { filter: data });
  }

  async delete(identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/audit/api/filters/${identifier}`);
  }
}
