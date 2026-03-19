/**
 * File Store API
 */

import type { HarnessClient } from '../client.js';
import type { File, Folder, CreateFileRequest, CreateFolderRequest, PageResponse, ListQueryParams } from '../types/index.js';

export class FileStoreAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List files
   */
  async listFiles(orgIdentifier?: string, projectIdentifier?: string, parentIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<File>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    if (parentIdentifier) {
      queryParams.parentIdentifier = parentIdentifier;
    }

    return this.client.get<PageResponse<File>>('/file-store/files', queryParams);
  }

  /**
   * Get file
   */
  async getFile(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<File> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<File>(`/file-store/files/${identifier}`, queryParams);
  }

  /**
   * Create file
   */
  async createFile(data: CreateFileRequest): Promise<File> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<File>('/file-store/files', data, queryParams);
  }

  /**
   * Update file
   */
  async updateFile(identifier: string, data: Partial<CreateFileRequest>, orgIdentifier?: string, projectIdentifier?: string): Promise<File> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.put<File>(`/file-store/files/${identifier}`, data, queryParams);
  }

  /**
   * Delete file
   */
  async deleteFile(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/file-store/files/${identifier}`, queryParams);
  }

  /**
   * List folders
   */
  async listFolders(orgIdentifier?: string, projectIdentifier?: string, parentIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Folder>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    if (parentIdentifier) {
      queryParams.parentIdentifier = parentIdentifier;
    }

    return this.client.get<PageResponse<Folder>>('/file-store/folders', queryParams);
  }

  /**
   * Create folder
   */
  async createFolder(data: CreateFolderRequest): Promise<Folder> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.post<Folder>('/file-store/folders', { folder: data }, queryParams);
  }

  /**
   * Delete folder
   */
  async deleteFolder(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<boolean> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/file-store/folders/${identifier}`, queryParams);
  }
}
