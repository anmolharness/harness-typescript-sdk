/**
 * Resource Types API
 */

import type { HarnessClient } from '../client.js';

export interface ResourceType {
  identifier: string;
  name: string;
  category: string;
  permissibleActions?: string[];
}

export class ResourceTypesAPI {
  constructor(private client: HarnessClient) {}

  async list(): Promise<ResourceType[]> {
    return this.client.get<ResourceType[]>('/authz/api/resource-types');
  }

  async get(identifier: string): Promise<ResourceType> {
    return this.client.get<ResourceType>(`/authz/api/resource-types/${identifier}`);
  }
}
