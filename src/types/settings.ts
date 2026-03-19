/**
 * Settings types
 */

export interface Setting {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  category: string;
  value: string | boolean | number;
  allowOverrides?: boolean;
  allowedValues?: unknown[];
  valueType?: 'STRING' | 'BOOLEAN' | 'NUMBER';
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface License {
  accountIdentifier: string;
  moduleType: string;
  edition?: string;
  licenseType?: string;
  status?: string;
  startTime?: number;
  expiryTime?: number;
  premiumSupport?: boolean;
  selfService?: boolean;
}
