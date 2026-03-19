/**
 * Clusters API (Kubernetes Clusters - different from GitOps clusters)
 */

import type { HarnessClient } from '../client.js';

export interface Cluster {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  connectorRef: string;
  clusterUrl: string;
  namespace?: string;
}

export class ClustersAPI {
  constructor(private client: HarnessClient) {}

  async list(connectorRef: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Cluster[]> {
    const queryParams: Record<string, string> = { connectorRef };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<Cluster[]>('/clusters', queryParams);
  }

  async get(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Cluster> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<Cluster>(`/clusters/${identifier}`, queryParams);
  }
}
