/**
 * GCP Projects API
 */

import type { HarnessClient } from '../client.js';

export interface GcpProject {
  id: string;
  projectId: string;
  projectNumber: string;
  name: string;
  organizationId?: string;
  billingAccountId?: string;
}

export class GcpProjectsAPI {
  constructor(private client: HarnessClient) {}

  async list(connectorRef: string): Promise<GcpProject[]> {
    return this.client.get<GcpProject[]>('/ccm/api/gcp-projects', { connectorRef });
  }

  async sync(connectorRef: string): Promise<{ status: string }> {
    return this.client.post<{ status: string }>('/ccm/api/gcp-projects/sync', { connectorRef });
  }
}
