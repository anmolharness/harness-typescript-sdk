/**
 * Monitoring & SLO types
 */

export interface MonitoredService {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  name: string;
  description?: string;
  serviceRef: string;
  environmentRef: string;
  type: string;
  sources?: unknown;
  tags?: Record<string, string>;
  enabled?: boolean;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface SLO {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  monitoredServiceRef: string;
  name: string;
  description?: string;
  type: 'Simple' | 'Composite';
  sloTarget?: {
    type: 'Rolling' | 'Calender';
    sloTargetPercentage: number;
    spec: unknown;
  };
  spec?: unknown;
  tags?: Record<string, string>;
  enabled?: boolean;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface Dashboard {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  viewPreferences?: unknown;
  datasources?: unknown[];
  panels?: unknown[];
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface Filter {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  filterType: string;
  filterProperties: unknown;
  createdAt?: number;
  lastModifiedAt?: number;
}
