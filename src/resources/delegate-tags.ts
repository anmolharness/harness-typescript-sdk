/**
 * Delegate Group Tags API
 */

import type { HarnessClient } from '../client.js';

export interface DelegateTag {
  name: string;
  value?: string;
}

export class DelegateTagsAPI {
  constructor(private client: HarnessClient) {}

  async list(delegateId: string, orgIdentifier?: string, projectIdentifier?: string): Promise<DelegateTag[]> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<DelegateTag[]>(`/delegate-group-tags/${delegateId}`, queryParams);
  }

  async update(delegateId: string, tags: DelegateTag[], orgIdentifier?: string, projectIdentifier?: string): Promise<DelegateTag[]> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.put<DelegateTag[]>(`/delegate-group-tags/${delegateId}`, { tags }, queryParams);
  }
}
