/**
 * Secret types
 */

export type SecretType = 'SecretText' | 'SecretFile' | 'SSHKey';

export interface Secret {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  type: SecretType;
  tags?: Record<string, string>;
  spec: Record<string, unknown>;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateSecretRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  type: SecretType;
  tags?: Record<string, string>;
  spec: Record<string, unknown>;
}

export interface UpdateSecretRequest {
  name?: string;
  description?: string;
  tags?: Record<string, string>;
  spec?: Record<string, unknown>;
}
