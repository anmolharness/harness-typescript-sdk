/**
 * Project types
 */

export interface Project {
  identifier: string;
  orgIdentifier: string;
  name: string;
  description?: string;
  color?: string;
  modules?: string[];
  tags?: Record<string, string>;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateProjectRequest {
  identifier: string;
  orgIdentifier: string;
  name: string;
  description?: string;
  color?: string;
  modules?: string[];
  tags?: Record<string, string>;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  color?: string;
  modules?: string[];
  tags?: Record<string, string>;
}
