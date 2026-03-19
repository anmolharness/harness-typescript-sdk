/**
 * CI Execution Config API
 */

import type { HarnessClient } from '../client.js';

export interface CiExecutionConfig {
  poolId?: string;
  isDefault?: boolean;
  infraType?: string;
  os?: string;
  cpu?: number;
  memory?: number;
}

export class CiExecutionConfigAPI {
  constructor(private client: HarnessClient) {}

  async get(orgIdentifier?: string, projectIdentifier?: string): Promise<CiExecutionConfig> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<CiExecutionConfig>('/ci-execution-config', queryParams);
  }

  async update(data: CiExecutionConfig, orgIdentifier?: string, projectIdentifier?: string): Promise<CiExecutionConfig> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.put<CiExecutionConfig>('/ci-execution-config', data, queryParams);
  }
}
