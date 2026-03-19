/**
 * Permissions API
 */

import type { HarnessClient } from '../client.js';

export interface Permission {
  identifier: string;
  name: string;
  status: string;
  allowedScopeLevels: string[];
  includedInAllRoles?: boolean;
}

export class PermissionsAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string): Promise<Permission[]> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<Permission[]>('/authz/api/permissions', queryParams);
  }
}
