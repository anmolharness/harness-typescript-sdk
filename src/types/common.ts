/**
 * Common types used across the Harness SDK
 */

export interface HarnessConfig {
  apiKey: string;
  accountId: string;
  baseUrl?: string;
  timeout?: number;
}

export interface HarnessError {
  code: string;
  message: string;
  status?: number;
  details?: unknown;
}

export interface ResponseDTO<T> {
  status: string;
  data: T;
  metaData?: unknown;
  correlationId?: string;
}

export interface PageResponse<T> {
  totalPages: number;
  totalItems: number;
  pageItemCount: number;
  pageSize: number;
  content: T[];
  pageIndex: number;
  empty: boolean;
}

export interface ListQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

export interface ScopeQueryParams {
  accountIdentifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
}
