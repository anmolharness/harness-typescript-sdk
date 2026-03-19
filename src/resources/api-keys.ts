/**
 * API Keys API
 */

import type { HarnessClient } from '../client.js';
import type { ApiKey, CreateApiKeyRequest, Token, CreateTokenRequest, PageResponse, ListQueryParams } from '../types/index.js';

export class ApiKeysAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List API keys
   */
  async list(parentIdentifier: string, apiKeyType: 'USER' | 'SERVICE_ACCOUNT', orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<ApiKey>> {
    const queryParams: Record<string, string> = {
      parentIdentifier,
      apiKeyType,
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<PageResponse<ApiKey>>('/apikey', queryParams);
  }

  /**
   * Get API key by identifier
   */
  async get(identifier: string, parentIdentifier: string, apiKeyType: 'USER' | 'SERVICE_ACCOUNT', orgIdentifier?: string, projectIdentifier?: string): Promise<ApiKey> {
    const queryParams: Record<string, string> = {
      parentIdentifier,
      apiKeyType,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<ApiKey>(`/apikey/${identifier}`, queryParams);
  }

  /**
   * Create API key
   */
  async create(data: CreateApiKeyRequest): Promise<ApiKey> {
    const queryParams: Record<string, string> = {
      parentIdentifier: data.parentIdentifier,
      apiKeyType: data.apiKeyType,
    };

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<ApiKey>('/apikey', { apiKey: data }, queryParams);
  }

  /**
   * Delete API key
   */
  async delete(identifier: string, parentIdentifier: string, apiKeyType: 'USER' | 'SERVICE_ACCOUNT', orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {
      parentIdentifier,
      apiKeyType,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/apikey/${identifier}`, queryParams);
  }

  /**
   * List tokens for an API key
   */
  async listTokens(apiKeyIdentifier: string, parentIdentifier: string, apiKeyType: 'USER' | 'SERVICE_ACCOUNT', orgIdentifier?: string, projectIdentifier?: string): Promise<PageResponse<Token>> {
    const queryParams: Record<string, string> = {
      apiKeyIdentifier,
      parentIdentifier,
      apiKeyType,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<PageResponse<Token>>('/token', queryParams);
  }

  /**
   * Create token
   */
  async createToken(data: CreateTokenRequest, orgIdentifier?: string, projectIdentifier?: string): Promise<Token> {
    const queryParams: Record<string, string> = {
      apiKeyIdentifier: data.apiKeyIdentifier,
      parentIdentifier: data.parentIdentifier,
      apiKeyType: data.apiKeyType,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.post<Token>('/token', { token: data }, queryParams);
  }

  /**
   * Revoke token
   */
  async revokeToken(identifier: string, apiKeyIdentifier: string, parentIdentifier: string, apiKeyType: 'USER' | 'SERVICE_ACCOUNT', orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {
      apiKeyIdentifier,
      parentIdentifier,
      apiKeyType,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/token/${identifier}`, queryParams);
  }
}
