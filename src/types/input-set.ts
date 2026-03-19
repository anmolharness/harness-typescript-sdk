/**
 * Input Set types
 */

export interface InputSet {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  pipelineIdentifier: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  yaml?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateInputSetRequest {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  pipelineIdentifier: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  yaml: string;
}

export interface UpdateInputSetRequest {
  name?: string;
  description?: string;
  tags?: Record<string, string>;
  yaml?: string;
}
