/**
 * Git Sync Settings API
 */

import type { HarnessClient } from '../client.js';

export interface GitSyncSettings {
  executeOnDelegate?: boolean;
  gitSyncEnabled?: boolean;
  isExecuteOnDelegateManaged?: boolean;
}

export class GitSyncSettingsAPI {
  constructor(private client: HarnessClient) {}

  async get(orgIdentifier?: string, projectIdentifier?: string): Promise<GitSyncSettings> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<GitSyncSettings>('/git-sync/settings', queryParams);
  }

  async update(data: GitSyncSettings, orgIdentifier?: string, projectIdentifier?: string): Promise<GitSyncSettings> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.put<GitSyncSettings>('/git-sync/settings', data, queryParams);
  }
}
