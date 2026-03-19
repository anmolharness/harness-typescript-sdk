/**
 * Service types
 */

export interface Service {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  yaml?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateServiceRequest {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  yaml?: string;
}

export interface UpdateServiceRequest {
  name?: string;
  description?: string;
  tags?: Record<string, string>;
  yaml?: string;
}
