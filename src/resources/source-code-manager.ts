/**
 * Source Code Manager API
 */

import type { HarnessClient } from '../client.js';

export interface ScmRepository {
  id: string;
  name: string;
  url: string;
  defaultBranch?: string;
  isPrivate?: boolean;
}

export class SourceCodeManagerAPI {
  constructor(private client: HarnessClient) {}

  async listRepositories(connectorRef: string, orgIdentifier?: string, projectIdentifier?: string): Promise<ScmRepository[]> {
    const queryParams: Record<string, string> = { connectorRef };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<ScmRepository[]>('/scm/repositories', queryParams);
  }

  async listBranches(connectorRef: string, repoName: string, orgIdentifier?: string, projectIdentifier?: string): Promise<string[]> {
    const queryParams: Record<string, string> = { connectorRef, repoName };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<string[]>('/scm/branches', queryParams);
  }

  async getFileContent(connectorRef: string, repoName: string, branch: string, filePath: string): Promise<{ content: string }> {
    return this.client.post<{ content: string }>('/scm/file-content', {
      connectorRef,
      repoName,
      branch,
      filePath,
    });
  }
}
