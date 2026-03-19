/**
 * Audit API
 */

import type { HarnessClient } from '../client.js';
import type { AuditEvent, AuditFilterProperties, PageResponse } from '../types/index.js';

export class AuditAPI {
  constructor(private client: HarnessClient) {}

  async list(
    filterProperties?: AuditFilterProperties,
    page?: number,
    limit?: number
  ): Promise<PageResponse<AuditEvent>> {
    const queryParams: Record<string, string> = {
      page: page?.toString() || '0',
      limit: limit?.toString() || '50',
    };

    return this.client.post<PageResponse<AuditEvent>>('/audit/api/audits/list', { filterProperties }, queryParams);
  }

  async get(auditId: string): Promise<AuditEvent> {
    return this.client.get<AuditEvent>(`/audit/api/audits/${auditId}`);
  }
}
