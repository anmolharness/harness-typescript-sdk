/**
 * Cloud Cost Recommendation Details API
 */

import type { HarnessClient } from '../client.js';

export interface RecommendationDetails {
  id: string;
  analysis: unknown;
  historicalData: unknown[];
  projectedSavings: number;
  implementationSteps: string[];
}

export class CloudCostRecommendationDetailsAPI {
  constructor(private client: HarnessClient) {}

  async get(recommendationId: string): Promise<RecommendationDetails> {
    return this.client.get<RecommendationDetails>(`/ccm/api/recommendations/${recommendationId}/details`);
  }

  async getAnalysis(recommendationId: string): Promise<unknown> {
    return this.client.get<unknown>(`/ccm/api/recommendations/${recommendationId}/analysis`);
  }
}
