/**
 * Freeze Window types
 */

export type FreezeType = 'GLOBAL' | 'MANUAL';
export type FreezeStatus = 'ENABLED' | 'DISABLED';

export interface FreezeWindow {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  type: FreezeType;
  status: FreezeStatus;
  freezeWindows: Array<{
    timeZone: string;
    startTime: string;
    endTime?: string;
    duration?: string;
    recurrence?: unknown;
  }>;
  rules?: Array<{
    entityConfigIdentifiers?: string[];
    environmentIdentifiers?: string[];
  }>;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateFreezeWindowRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  type: FreezeType;
  yaml?: string;
}
