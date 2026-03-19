/**
 * Cloud Cost Recommendations API
 */

import type { HarnessClient } from '../client.js';

export interface CostRecommendation {
  id: string;
  type: string;
  resourceId: string;
  potentialSavings: number;
  recommendation: string;
  status: 'OPEN' | 'APPLIED' | 'DISMISSED';
}

export class CloudCostRecommendationsAPI {
  constructor(private client: HarnessClient) {}

  async list(): Promise<CostRecommendation[]> {
    return this.client.get<CostRecommendation[]>('/ccm/api/recommendations');
  }

  async get(recommendationId: string): Promise<CostRecommendation> {
    return this.client.get<CostRecommendation>(`/ccm/api/recommendations/${recommendationId}`);
  }

  async apply(recommendationId: string): Promise<{ status: string }> {
    return this.client.post<{ status: string }>(`/ccm/api/recommendations/${recommendationId}/apply`, {});
  }

  async dismiss(recommendationId: string): Promise<boolean> {
    return this.client.post<boolean>(`/ccm/api/recommendations/${recommendationId}/dismiss`, {});
  }
}
