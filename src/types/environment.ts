/**
 * Environment types
 */

export type EnvironmentType = 'Production' | 'PreProduction';

export interface Environment {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  name: string;
  description?: string;
  type: EnvironmentType;
  tags?: Record<string, string>;
  yaml?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateEnvironmentRequest {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  name: string;
  description?: string;
  type: EnvironmentType;
  tags?: Record<string, string>;
  yaml?: string;
}

export interface UpdateEnvironmentRequest {
  name?: string;
  description?: string;
  type?: EnvironmentType;
  tags?: Record<string, string>;
  yaml?: string;
}
