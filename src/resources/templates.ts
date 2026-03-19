/**
 * Templates API
 */

import type { HarnessClient } from '../client.js';
import type {
  Template,
  CreateTemplateRequest,
  UpdateTemplateRequest,
  PageResponse,
  ListQueryParams,
} from '../types/index.js';

export class TemplatesAPI {
  constructor(private client: HarnessClient) {}

  /**
   * List templates
   */
  async list(orgIdentifier?: string, projectIdentifier?: string, params?: ListQueryParams): Promise<PageResponse<Template>> {
    const queryParams: Record<string, string> = {
      page: params?.page?.toString() || '0',
      size: params?.limit?.toString() || '50',
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    if (params?.searchTerm) {
      queryParams.searchTerm = params.searchTerm;
    }

    return this.client.post<PageResponse<Template>>('/template/api/templates/list-metadata', {}, queryParams);
  }

  /**
   * Get template by identifier
   */
  async get(
    identifier: string,
    versionLabel: string,
    orgIdentifier?: string,
    projectIdentifier?: string
  ): Promise<Template> {
    const queryParams: Record<string, string> = {
      versionLabel,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<Template>(`/template/api/templates/${identifier}`, queryParams);
  }

  /**
   * Create template
   */
  async create(data: CreateTemplateRequest): Promise<Template> {
    const queryParams: Record<string, string> = {};

    if (data.orgIdentifier) {
      queryParams.orgIdentifier = data.orgIdentifier;
    }

    if (data.projectIdentifier) {
      queryParams.projectIdentifier = data.projectIdentifier;
    }

    return this.client.postYaml<Template>('/template/api/templates', data.yaml, queryParams);
  }

  /**
   * Update template
   */
  async update(
    identifier: string,
    versionLabel: string,
    yaml: string,
    orgIdentifier?: string,
    projectIdentifier?: string
  ): Promise<Template> {
    const queryParams: Record<string, string> = {
      versionLabel,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.putYaml<Template>(`/template/api/templates/${identifier}`, yaml, queryParams);
  }

  /**
   * Delete template
   */
  async delete(
    identifier: string,
    versionLabel: string,
    orgIdentifier?: string,
    projectIdentifier?: string
  ): Promise<boolean> {
    const queryParams: Record<string, string> = {
      versionLabel,
    };

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.delete<boolean>(`/template/api/templates/${identifier}/${versionLabel}`, queryParams);
  }

  /**
   * List template versions
   */
  async listVersions(identifier: string, orgIdentifier?: string, projectIdentifier?: string): Promise<Template[]> {
    const queryParams: Record<string, string> = {};

    if (orgIdentifier) {
      queryParams.orgIdentifier = orgIdentifier;
    }

    if (projectIdentifier) {
      queryParams.projectIdentifier = projectIdentifier;
    }

    return this.client.get<Template[]>(`/template/api/templates/${identifier}/versions`, queryParams);
  }
}
