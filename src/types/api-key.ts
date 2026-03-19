/**
 * API Key types
 */

export type ApiKeyType = 'USER' | 'SERVICE_ACCOUNT';

export interface ApiKey {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  apiKeyType: ApiKeyType;
  parentIdentifier: string;
  tags?: Record<string, string>;
  defaultTimeToExpireToken?: number;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateApiKeyRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  apiKeyType: ApiKeyType;
  parentIdentifier: string;
  tags?: Record<string, string>;
  defaultTimeToExpireToken?: number;
}

export interface Token {
  identifier: string;
  name: string;
  apiKeyIdentifier: string;
  parentIdentifier: string;
  apiKeyType: ApiKeyType;
  validFrom?: number;
  validTo?: number;
  scheduledExpireTime?: number;
  valid?: boolean;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateTokenRequest {
  identifier: string;
  name: string;
  apiKeyIdentifier: string;
  apiKeyType: ApiKeyType;
  parentIdentifier: string;
  validFrom?: number;
  validTo?: number;
}
