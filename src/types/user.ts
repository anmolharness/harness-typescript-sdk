/**
 * User types
 */

export interface User {
  uuid: string;
  name: string;
  email: string;
  locked?: boolean;
  disabled?: boolean;
  externallyManaged?: boolean;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface UserGroup {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  users?: string[];
  notificationConfigs?: unknown[];
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateUserGroupRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  users?: string[];
  notificationConfigs?: unknown[];
}

export interface Role {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  permissions?: string[];
  allowedScopeLevels?: string[];
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateRoleRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  permissions?: string[];
  allowedScopeLevels?: string[];
}

export interface RoleAssignment {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  roleIdentifier: string;
  principal: {
    identifier: string;
    type: 'USER' | 'USER_GROUP' | 'SERVICE_ACCOUNT';
    scopeLevel?: string;
  };
  resourceGroupIdentifier: string;
  disabled?: boolean;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateRoleAssignmentRequest {
  roleIdentifier: string;
  principal: {
    identifier: string;
    type: 'USER' | 'USER_GROUP' | 'SERVICE_ACCOUNT';
    scopeLevel?: string;
  };
  resourceGroupIdentifier: string;
  disabled?: boolean;
}
