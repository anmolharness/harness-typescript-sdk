/**
 * Variable types
 */

export type VariableType = 'String' | 'Number' | 'Secret';

export interface Variable {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  type: VariableType;
  value?: string;
  valueType?: 'FIXED' | 'RUNTIME';
  tags?: Record<string, string>;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateVariableRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  type: VariableType;
  value?: string;
  valueType?: 'FIXED' | 'RUNTIME';
  tags?: Record<string, string>;
}

export interface VariableSet {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  variables?: Variable[];
  tags?: Record<string, string>;
  createdAt?: number;
  lastModifiedAt?: number;
}
