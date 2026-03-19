/**
 * Policy Enforcement API
 */

import type { HarnessClient } from '../client.js';
import type { PolicyEvaluation } from '../types/index.js';

export class PolicyEnforcementAPI {
  constructor(private client: HarnessClient) {}

  async evaluate(policySetIdentifier: string, entityMetadata: unknown, orgIdentifier?: string, projectIdentifier?: string): Promise<PolicyEvaluation> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.post<PolicyEvaluation>('/pm/api/v1/policy-enforcement/evaluate', {
      policySetIdentifier,
      entityMetadata,
    }, queryParams);
  }

  async getHistory(entityId: string, orgIdentifier?: string, projectIdentifier?: string): Promise<PolicyEvaluation[]> {
    const queryParams: Record<string, string> = { entityId };
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<PolicyEvaluation[]>('/pm/api/v1/policy-enforcement/history', queryParams);
  }
}
