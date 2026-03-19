/**
 * Infrastructure types
 */

export type InfrastructureType = 'KubernetesDirect' | 'KubernetesGcp' | 'ServerlessAwsLambda' | 'Pdc' | 'SshWinRmAzure' | 'SshWinRmAws';

export interface Infrastructure {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  environmentRef: string;
  name: string;
  description?: string;
  type: InfrastructureType;
  deploymentType: string;
  tags?: Record<string, string>;
  yaml?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateInfrastructureRequest {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  environmentRef: string;
  name: string;
  description?: string;
  type: InfrastructureType;
  deploymentType: string;
  tags?: Record<string, string>;
  yaml?: string;
}

export interface UpdateInfrastructureRequest {
  name?: string;
  description?: string;
  tags?: Record<string, string>;
  yaml?: string;
}
