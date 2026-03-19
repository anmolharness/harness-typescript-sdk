/**
 * Cloud Cost Cluster Orchestrator API
 */

import type { HarnessClient } from '../client.js';

export interface ClusterOrchestrator {
  id: string;
  clusterName: string;
  cloudAccountId: string;
  region: string;
  recommendations?: unknown[];
  savings?: number;
}

export class CloudCostClusterOrchestratorAPI {
  constructor(private client: HarnessClient) {}

  async list(): Promise<ClusterOrchestrator[]> {
    return this.client.get<ClusterOrchestrator[]>('/ccm/api/cluster-orchestrator');
  }

  async get(clusterId: string): Promise<ClusterOrchestrator> {
    return this.client.get<ClusterOrchestrator>(`/ccm/api/cluster-orchestrator/${clusterId}`);
  }

  async getRecommendations(clusterId: string): Promise<unknown[]> {
    return this.client.get<unknown[]>(`/ccm/api/cluster-orchestrator/${clusterId}/recommendations`);
  }
}
