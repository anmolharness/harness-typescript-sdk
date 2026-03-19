/**
 * Access Control List API
 */

import type { HarnessClient } from '../client.js';

export interface AccessControlEntry {
  principal: {
    type: 'USER' | 'USER_GROUP' | 'SERVICE_ACCOUNT';
    identifier: string;
  };
  resourceScope: {
    accountIdentifier: string;
    orgIdentifier?: string;
    projectIdentifier?: string;
  };
  permissions: string[];
  permitted: boolean;
}

export class AccessControlAPI {
  constructor(private client: HarnessClient) {}

  async check(principal: { type: string; identifier: string }, permissions: string[], resourceScope: unknown): Promise<AccessControlEntry[]> {
    return this.client.post<AccessControlEntry[]>('/authz/api/acl', {
      principal,
      permissions,
      resourceScope,
    });
  }

  async checkBulk(checks: Array<{ principal: unknown; permissions: string[]; resourceScope: unknown }>): Promise<AccessControlEntry[]> {
    return this.client.post<AccessControlEntry[]>('/authz/api/acl/batch', { checks });
  }
}
