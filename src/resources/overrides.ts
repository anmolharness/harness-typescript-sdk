/**
 * Overrides API
 */

import type { HarnessClient } from '../client.js';

export interface Override {
  identifier: string;
  type: 'GLOBAL' | 'SERVICE' | 'ENVIRONMENT';
  yaml: string;
}

export class OverridesAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier: string, projectIdentifier: string): Promise<Override[]> {
    return this.client.get<Override[]>('/overrides', {
      orgIdentifier,
      projectIdentifier,
    });
  }

  async create(data: Override, orgIdentifier: string, projectIdentifier: string): Promise<Override> {
    return this.client.postYaml<Override>('/overrides', data.yaml, {
      orgIdentifier,
      projectIdentifier,
      type: data.type,
    });
  }

  async delete(identifier: string, orgIdentifier: string, projectIdentifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/overrides/${identifier}`, {
      orgIdentifier,
      projectIdentifier,
    });
  }
}
