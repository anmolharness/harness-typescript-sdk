/**
 * Cloud Cost Anomalies API
 */

import type { HarnessClient } from '../client.js';
import type { CloudCostAnomaly, PageResponse } from '../types/index.js';

export class CloudCostAnomaliesAPI {
  constructor(private client: HarnessClient) {}

  async list(startTime?: number, endTime?: number, page?: number, limit?: number): Promise<PageResponse<CloudCostAnomaly>> {
    const queryParams: Record<string, string> = {
      pageIndex: page?.toString() || '0',
      pageSize: limit?.toString() || '50',
    };

    if (startTime) {
      queryParams.startTime = startTime.toString();
    }

    if (endTime) {
      queryParams.endTime = endTime.toString();
    }

    return this.client.get<PageResponse<CloudCostAnomaly>>('/ccm/api/anomaly', queryParams);
  }

  async get(anomalyId: string): Promise<CloudCostAnomaly> {
    return this.client.get<CloudCostAnomaly>(`/ccm/api/anomaly/${anomalyId}`);
  }
}
