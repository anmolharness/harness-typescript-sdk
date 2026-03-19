/**
 * Template types
 */

export type TemplateType = 'Step' | 'Stage' | 'Pipeline' | 'CustomDeployment' | 'MonitoredService' | 'SecretManager';

export interface Template {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  type: TemplateType;
  tags?: Record<string, string>;
  yaml?: string;
  versionLabel: string;
  stableTemplate?: boolean;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateTemplateRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  type: TemplateType;
  tags?: Record<string, string>;
  yaml: string;
  versionLabel: string;
}

export interface UpdateTemplateRequest {
  name?: string;
  description?: string;
  tags?: Record<string, string>;
  yaml?: string;
}
