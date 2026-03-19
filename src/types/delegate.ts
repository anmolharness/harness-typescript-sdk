/**
 * Delegate types
 */

export interface Delegate {
  uuid: string;
  accountId: string;
  delegateName: string;
  delegateType: string;
  description?: string;
  hostName?: string;
  ip?: string;
  status: string;
  lastHeartBeat?: number;
  version?: string;
  tags?: string[];
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface DelegateToken {
  uuid: string;
  accountId: string;
  name: string;
  status: string;
  value?: string;
  createdAt?: number;
  createdBy?: unknown;
  revokedAt?: number;
  revokedBy?: unknown;
}

export interface CreateDelegateTokenRequest {
  name: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  timeToLive?: number;
}
