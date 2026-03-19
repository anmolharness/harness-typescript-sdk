/**
 * File Store types
 */

export type FileUsage = 'CONFIG' | 'MANIFEST_FILE' | 'SCRIPT';

export interface File {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  fileUsage: FileUsage;
  mimeType?: string;
  size?: number;
  parentIdentifier?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface Folder {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  parentIdentifier?: string;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreateFileRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  fileUsage: FileUsage;
  mimeType?: string;
  content: string | Blob;
  parentIdentifier?: string;
}

export interface CreateFolderRequest {
  identifier: string;
  orgIdentifier?: string;
  projectIdentifier?: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  parentIdentifier?: string;
}
