/**
 * Invites API
 */

import type { HarnessClient } from '../client.js';

export interface Invite {
  id: string;
  email: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  roleBindings: Array<{ roleIdentifier: string; resourceGroupIdentifier: string }>;
  approved?: boolean;
  createdAt?: number;
}

export class InvitesAPI {
  constructor(private client: HarnessClient) {}

  async list(orgIdentifier?: string, projectIdentifier?: string): Promise<Invite[]> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.get<Invite[]>('/users/invites', queryParams);
  }

  async create(email: string, roleBindings: unknown[], orgIdentifier?: string, projectIdentifier?: string): Promise<Invite> {
    const queryParams: Record<string, string> = {};
    if (orgIdentifier) queryParams.orgIdentifier = orgIdentifier;
    if (projectIdentifier) queryParams.projectIdentifier = projectIdentifier;
    return this.client.post<Invite>('/users/invites', { email, roleBindings }, queryParams);
  }

  async delete(inviteId: string): Promise<boolean> {
    return this.client.delete<boolean>(`/users/invites/${inviteId}`);
  }
}
