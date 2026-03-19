/**
 * Git Sync types
 */

export interface GitSync {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  repo: string;
  branch: string;
  connectorRef: string;
  syncEnabled: boolean;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface GitSyncError {
  gitCommitId?: string;
  filePath?: string;
  errorMessage?: string;
  failureReason?: string;
  createdAt?: number;
}

export interface GitBranch {
  name: string;
  commitId?: string;
  protected?: boolean;
}
