/**
 * Trigger types
 */

export type TriggerType = 'Webhook' | 'Scheduled' | 'Artifact' | 'Manifest';

export interface Trigger {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  targetIdentifier: string;
  name: string;
  description?: string;
  type: TriggerType;
  enabled?: boolean;
  tags?: Record<string, string>;
  yaml?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateTriggerRequest {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  targetIdentifier: string;
  name: string;
  description?: string;
  type: TriggerType;
  enabled?: boolean;
  tags?: Record<string, string>;
  yaml: string;
}

export interface UpdateTriggerRequest {
  name?: string;
  description?: string;
  enabled?: boolean;
  tags?: Record<string, string>;
  yaml?: string;
}
