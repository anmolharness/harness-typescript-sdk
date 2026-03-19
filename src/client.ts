/**
 * Core Harness API client
 */

import type { HarnessConfig, HarnessError, ResponseDTO } from './types/common.js';

export class HarnessClient {
  private apiKey: string;
  private accountId: string;
  private baseUrl: string;
  private timeout: number;

  constructor(config: HarnessConfig) {
    this.apiKey = config.apiKey;
    this.accountId = config.accountId;
    this.baseUrl = config.baseUrl || 'https://app.harness.io';
    this.timeout = config.timeout || 30000;
  }

  /**
   * GET request to Harness API
   */
  async get<T>(path: string, queryParams?: Record<string, string>): Promise<T> {
    return this.request<T>('GET', path, undefined, queryParams);
  }

  /**
   * POST request to Harness API
   */
  async post<T>(path: string, body?: unknown, queryParams?: Record<string, string>): Promise<T> {
    return this.request<T>('POST', path, body, queryParams);
  }

  /**
   * PUT request to Harness API
   */
  async put<T>(path: string, body?: unknown, queryParams?: Record<string, string>): Promise<T> {
    return this.request<T>('PUT', path, body, queryParams);
  }

  /**
   * DELETE request to Harness API
   */
  async delete<T>(path: string, queryParams?: Record<string, string>): Promise<T> {
    return this.request<T>('DELETE', path, undefined, queryParams);
  }

  /**
   * POST request with YAML body
   */
  async postYaml<T>(path: string, yamlBody: string, queryParams?: Record<string, string>): Promise<T> {
    return this.requestYaml<T>('POST', path, yamlBody, queryParams);
  }

  /**
   * PUT request with YAML body
   */
  async putYaml<T>(path: string, yamlBody: string, queryParams?: Record<string, string>): Promise<T> {
    return this.requestYaml<T>('PUT', path, yamlBody, queryParams);
  }

  /**
   * Core HTTP request method
   */
  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    extraParams?: Record<string, string>
  ): Promise<T> {
    const params = new URLSearchParams({
      accountIdentifier: this.accountId,
      ...extraParams,
    });

    const apiBase = this.buildApiBase(path);
    const separator = apiBase.includes('?') ? '&' : '?';
    const url = `${apiBase}${separator}${params.toString()}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    };

    const options: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(this.timeout),
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      await this.handleError(response, url);
    }

    const json = await response.json();

    // Unwrap Harness ResponseDTO if present
    if (json && typeof json === 'object' && 'data' in json) {
      return (json as ResponseDTO<T>).data;
    }

    return json as T;
  }

  /**
   * YAML request method
   */
  private async requestYaml<T>(
    method: string,
    path: string,
    yamlBody: string,
    extraParams?: Record<string, string>
  ): Promise<T> {
    const params = new URLSearchParams({
      accountIdentifier: this.accountId,
      ...extraParams,
    });

    const apiBase = this.buildApiBase(path);
    const separator = apiBase.includes('?') ? '&' : '?';
    const url = `${apiBase}${separator}${params.toString()}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/yaml',
      'x-api-key': this.apiKey,
    };

    const options: RequestInit = {
      method,
      headers,
      body: yamlBody,
      signal: AbortSignal.timeout(this.timeout),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      await this.handleError(response, url);
    }

    const json = await response.json();

    // Unwrap Harness ResponseDTO if present
    if (json && typeof json === 'object' && 'data' in json) {
      return (json as ResponseDTO<T>).data;
    }

    return json as T;
  }

  /**
   * Build API base URL based on endpoint path
   */
  private buildApiBase(path: string): string {
    // These paths are rooted directly on the base URL (no /ng/api prefix)
    if (
      path.startsWith('/pipeline/') ||
      path.startsWith('/template/') ||
      path.startsWith('/v1/') ||
      path.startsWith('/pm/')
    ) {
      return `${this.baseUrl}${path}`;
    }

    // Legacy NG manager paths
    return `${this.baseUrl}/ng/api${path}`;
  }

  /**
   * Handle HTTP errors
   */
  private async handleError(response: Response, url: string): Promise<never> {
    const errorBody = await response.text().catch(() => 'Unknown error');

    let message = response.statusText;
    try {
      const parsed = JSON.parse(errorBody);
      message = parsed.message || parsed.error?.message || parsed.responseMessages?.[0]?.message || response.statusText;
    } catch {
      message = errorBody.substring(0, 200) || response.statusText;
    }

    const error: HarnessError = {
      code: `HARNESS_API_${response.status}`,
      message: `Harness API ${response.status}: ${message}`,
      status: response.status,
      details: { url, body: errorBody },
    };

    throw new Error(JSON.stringify(error));
  }

  /**
   * Get account ID
   */
  getAccountId(): string {
    return this.accountId;
  }

  /**
   * Get base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}
