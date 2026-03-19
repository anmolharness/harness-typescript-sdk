/**
 * Audit types
 */

export interface AuditEvent {
  id: string;
  insertId: string;
  resourceScope: {
    accountIdentifier: string;
    orgIdentifier?: string;
    projectIdentifier?: string;
  };
  timestamp: number;
  authenticationInfo: {
    principal: {
      type: string;
      identifier: string;
    };
  };
  module: string;
  resource: {
    type: string;
    identifier: string;
  };
  action: string;
  requestMetadata?: unknown;
  httpRequestInfo?: unknown;
  auditEventData?: unknown;
}

export interface AuditFilterProperties {
  resources?: Array<{
    resourceType: string;
    resourceIdentifier?: string;
  }>;
  modules?: string[];
  actions?: string[];
  principals?: Array<{
    type: string;
    identifier: string;
  }>;
  scopes?: Array<{
    orgIdentifier?: string;
    projectIdentifier?: string;
  }>;
  startTime?: number;
  endTime?: number;
}
