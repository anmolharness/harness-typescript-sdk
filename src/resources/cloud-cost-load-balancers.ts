/**
 * Cloud Cost AutoStopping Load Balancers API
 */

import type { HarnessClient } from '../client.js';
import type { LoadBalancer, PageResponse, ListQueryParams } from '../types/index.js';

export class CloudCostLoadBalancersAPI {
  constructor(private client: HarnessClient) {}

  async list(params?: ListQueryParams): Promise<PageResponse<LoadBalancer>> {
    const queryParams: Record<string, string> = {
      page: params?.page?.toString() || '0',
      limit: params?.limit?.toString() || '50',
    };
    return this.client.get<PageResponse<LoadBalancer>>('/gateway/lw/api/accounts/{accountId}/autostopping/load-balancers', queryParams);
  }

  async get(lbId: string): Promise<LoadBalancer> {
    return this.client.get<LoadBalancer>(`/gateway/lw/api/accounts/{accountId}/autostopping/load-balancers/${lbId}`);
  }

  async create(data: Partial<LoadBalancer>): Promise<LoadBalancer> {
    return this.client.post<LoadBalancer>('/gateway/lw/api/accounts/{accountId}/autostopping/load-balancers', data);
  }

  async delete(lbId: string): Promise<boolean> {
    return this.client.delete<boolean>(`/gateway/lw/api/accounts/{accountId}/autostopping/load-balancers/${lbId}`);
  }
}
