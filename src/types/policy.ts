/**
 * Policy (OPA) types
 */

export interface PolicySet {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  type: string;
  policies: Array<{
    identifier: string;
    severity: 'error' | 'warning';
  }>;
  enabled: boolean;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface Policy {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  rego: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface PolicyEvaluation {
  policySetIdentifier: string;
  status: 'pass' | 'fail' | 'warning';
  details?: Array<{
    policyIdentifier: string;
    policyName: string;
    status: 'pass' | 'fail' | 'warning';
    denyMessages?: string[];
  }>;
}
