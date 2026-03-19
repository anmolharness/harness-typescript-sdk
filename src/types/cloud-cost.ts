/**
 * Cloud Cost Management types
 */

export interface CloudCostAnomaly {
  id: string;
  accountId: string;
  actualCost: number;
  expectedCost: number;
  anomalyScore: number;
  resourceType?: string;
  resourceId?: string;
  time: number;
}

export interface CloudCostBudget {
  uuid: string;
  accountId: string;
  name: string;
  scope: string;
  type: 'SPECIFIED_AMOUNT' | 'PREVIOUS_MONTH_SPEND';
  budgetAmount?: number;
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  alertThresholds?: number[];
  emailAddresses?: string[];
  enabled: boolean;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CloudCostPerspective {
  uuid: string;
  accountId: string;
  name: string;
  viewType?: string;
  viewState?: string;
  folderId?: string;
  viewPreferences?: unknown;
  viewVisualization?: unknown;
  dataSources?: unknown[];
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface AutoStoppingRule {
  id: number;
  name: string;
  cloud_account_id: string;
  disabled: boolean;
  kind: string;
  fulfilment: string;
  custom_domains?: string[];
  health_check?: unknown;
  routing?: unknown;
  metadata?: unknown;
}

export interface LoadBalancer {
  id: string;
  name: string;
  cloud_account_id: string;
  host_name: string;
  region: string;
  vpc: string;
}
