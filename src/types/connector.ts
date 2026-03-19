/**
 * Connector types
 */

export type ConnectorType =
  | 'K8sCluster'
  | 'Git'
  | 'Github'
  | 'Gitlab'
  | 'Bitbucket'
  | 'DockerRegistry'
  | 'Gcp'
  | 'Aws'
  | 'Azure'
  | 'HttpHelmRepo'
  | 'OciHelmRepo';

export interface Connector {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  type: ConnectorType;
  tags?: Record<string, string>;
  spec: Record<string, unknown>;
  yaml?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateConnectorRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  type: ConnectorType;
  tags?: Record<string, string>;
  spec: Record<string, unknown>;
}

export interface UpdateConnectorRequest {
  name?: string;
  description?: string;
  tags?: Record<string, string>;
  spec?: Record<string, unknown>;
}
