/**
 * Feature Flags API
 */

import type { HarnessClient } from '../client.js';

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  scope?: string;
}

export class FeatureFlagsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string): Promise<FeatureFlag[]> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<FeatureFlag[]>('/feature-flags', queryParams);
  }

  async get(name: string): Promise<FeatureFlag> {
    return this.client.get<FeatureFlag>(`/feature-flags/${name}`);
  }
}
