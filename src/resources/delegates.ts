/**
 * Delegates API
 */

import type { HarnessClient } from '../client.js';
import type { Delegate, DelegateToken, CreateDelegateTokenRequest, PageResponse, ListQueryParams } from '../types/index.js';

export class DelegatesAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List delegates
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Delegate>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    if (params?.searchTerm) {
      queryParams.filterTerm = params.searchTerm;
    }

    return this.client.get<PageResponse<Delegate>>('/delegate-setup-resource', queryParams);
  }

  /**
   * Get delegate by ID
   */
  async get(delegateId: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Delegate> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<Delegate>(`/delegate-setup-resource/${delegateId}`, queryParams);
  }

  /**
   * Delete delegate
   */
  async delete(delegateId: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/delegate-setup-resource/${delegateId}`, queryParams);
  }

  /**
   * List delegate tokens
   */
  async listTokens(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<DelegateToken>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<PageResponse<DelegateToken>>('/delegate-token-resource', queryParams);
  }

  /**
   * Create delegate token
   */
  async createToken(data: CreateDelegateTokenRequest): Promise<DelegateToken> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<DelegateToken>('/delegate-token-resource', data, queryParams);
  }

  /**
   * Revoke delegate token
   */
  async revokeToken(tokenId: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/delegate-token-resource/${tokenId}`, queryParams);
  }
}
