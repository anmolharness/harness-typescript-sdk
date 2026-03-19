/**
 * GitOps types
 */

export interface GitOpsAgent {
  identifier: string;
  accountIdentifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  type: string;
  metadata: {
    namespace?: string;
    highAvailability?: boolean;
  };
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface GitOpsCluster {
  identifier: string;
  accountIdentifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  agentIdentifier: string;
  name: string;
  server: string;
  config?: {
    tlsClientConfig?: unknown;
    username?: string;
    password?: string;
    bearerToken?: string;
  };
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface GitOpsApplication {
  identifier: string;
  accountIdentifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  agentIdentifier: string;
  clusterIdentifier: string;
  repoIdentifier: string;
  name: string;
  description?: string;
  spec?: unknown;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface GitOpsRepository {
  identifier: string;
  accountIdentifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  agentIdentifier: string;
  name: string;
  repo: string;
  username?: string;
  type?: 'git' | 'helm';
  createdAt?: number;
  lastModifiedAt?: number;
}
