/**
 * Resource Group types
 */

export interface ResourceGroup {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  color?: string;
  resourceFilter?: {
    includeAllResources?: boolean;
    resources?: Array<{
      resourceType: string;
      identifiers?: string[];
      attributeFilter?: unknown;
    }>;
  };
  createdAt?: number;
  lastModifiedAt?: number;
}
