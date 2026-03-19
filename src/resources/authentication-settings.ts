/**
 * Authentication Settings API
 */

import type { HarnessClient } from '../client.js';

export interface AuthenticationSettings {
  authenticationMechanism: 'USER_PASSWORD' | 'SAML' | 'LDAP' | 'OAUTH';
  twoFactorAdminEnforced?: boolean;
  twoFactorEnabled?: boolean;
  samlSettings?: unknown;
  ldapSettings?: unknown;
  oauthSettings?: unknown;
}

export class AuthenticationSettingsAPI {
  constructor(private client: HarnessClient) {}

  async get(): Promise<AuthenticationSettings> {
    return this.client.get<AuthenticationSettings>('/authentication-settings');
  }

  async update(data: Partial<AuthenticationSettings>): Promise<AuthenticationSettings> {
    return this.client.put<AuthenticationSettings>('/authentication-settings', data);
  }

  async updateSaml(samlSettings: unknown): Promise<AuthenticationSettings> {
    return this.client.put<AuthenticationSettings>('/authentication-settings/saml', { samlSettings });
  }

  async updateLdap(ldapSettings: unknown): Promise<AuthenticationSettings> {
    return this.client.put<AuthenticationSettings>('/authentication-settings/ldap', { ldapSettings });
  }
}
