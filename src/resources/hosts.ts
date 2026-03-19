/**
 * Hosts API
 */

import type { HarnessClient } from '../client.js';

export interface Host {
  hostName: string;
  properties: Record<string, string>;
  tags?: Record<string, string>;
}

export class HostsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier: string, projectIdentifier: string, environmentId: string): Promise<Host[]> {
    return this.client.get<Host[]>('/hosts', {
      orgIdentifier,
      projectIdentifier,
      environmentIdentifier: environmentId,
    });
  }

  async validate(hostName: string, orgIdentifier: string, projectIdentifier: string): Promise<{ status: string }> {
    return this.client.post<{ status: string }>('/hosts/validate', {
      hostName,
      orgIdentifier,
      projectIdentifier,
    });
  }
}
