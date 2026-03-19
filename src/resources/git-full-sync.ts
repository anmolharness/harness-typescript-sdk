/**
 * Git Full Sync API
 */

import type { HarnessClient } from '../client.js';

export interface FullSyncJob {
  uuid: string;
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  startTime?: number;
  endTime?: number;
  syncedEntities?: number;
  errors?: string[];
}

export class GitFullSyncAPI {
  constructor(private client: HarnessClient) {}

  async trigger(orgIdentifier?: string, projectIdentifier?: string): Promise<FullSyncJob> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.post<FullSyncJob>('/git-sync/full-sync', {}, queryParams);
  }

  async getStatus(jobId: string, orgIdentifier?: string, projectIdentifier?: string): Promise<FullSyncJob> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<FullSyncJob>(`/git-sync/full-sync/${jobId}`, queryParams);
  }

  async cancel(jobId: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.post<boolean>(`/git-sync/full-sync/${jobId}/cancel`, {}, queryParams);
  }
}
