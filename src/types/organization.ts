/**
 * Organization types
 */

export interface Organization {
  identifier: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  harnessManaged?: boolean;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateOrganizationRequest {
  identifier: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
}

export interface UpdateOrganizationRequest {
  name?: string;
  description?: string;
  tags?: Record<string, string>;
}
