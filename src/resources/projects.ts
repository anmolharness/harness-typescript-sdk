/**
 * Projects API
 */

import type { HarnessClient } from '../client.js';
import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class ProjectsAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List projects
   */
  async list(orgIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Project>> {
    const queryParams: Record<string, string> = {
      pageIndex: params?.page?.toString() || '0',
      pageSize: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (params?.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    if (params?.sort) {
      queryParams.sort = params.sort;
      queryParams.order = params.order || 'ASC';
    }

    return this.client.get<PageResponse<Project>>('/projects', queryParams);
  }

  /**
   * Get project by identifier
   */
  async get(orgIdentifier: string, identifier: string): Promise<Project> {
    return this.client.get<Project>(`/projects/${identifier}`, { orgIdentifier });
  }

  /**
   * Create project
   */
  async create(data: CreateProjectRequest): Promise<Project> {
    return this.client.post<Project>('/projects', { project: data }, { orgIdentifier: data.orgIdentifier });
  }

  /**
   * Update project
   */
  async update(orgIdentifier: string, identifier: string, data: UpdateProjectRequest): Promise<Project> {
    return this.client.put<Project>(`/projects/${identifier}`, { project: data }, { orgIdentifier });
  }

  /**
   * Delete project
   */
  async delete(orgIdentifier: string, identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/projects/${identifier}`, { orgIdentifier });
  }
}
