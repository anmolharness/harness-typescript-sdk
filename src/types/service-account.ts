/**
 * Service Account types
 */

export interface ServiceAccount {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  email: string;
  tags?: Record<string, string>;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateServiceAccountRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  email: string;
  tags?: Record<string, string>;
}

export interface UpdateServiceAccountRequest {
  name?: string;
  description?: string;
  tags?: Record<string, string>;
}
