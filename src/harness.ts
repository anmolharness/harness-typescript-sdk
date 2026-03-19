/**
 * Main Harness SDK class
 */

import { HarnessClient } from './client.js';
import { OrganizationsAPI } from './resources/organizations.js';
import { ProjectsAPI } from './resources/projects.js';
import { ServicesAPI } from './resources/services.js';
import { EnvironmentsAPI } from './resources/environments.js';
import { ConnectorsAPI } from './resources/connectors.js';
import { SecretsAPI } from './resources/secrets.js';
import { PipelinesAPI } from './resources/pipelines.js';
import { InfrastructuresAPI } from './resources/infrastructures.js';
import type { HarnessConfig } from './types/index.js';

/**
 * Harness SDK - TypeScript SDK for Harness Platform API
 *
 * @example
 * ```typescript
 * const harness = new HarnessSDK({
 *   apiKey: 'your-api-key',
 *   accountId: 'your-account-id',
 * });
 *
 * // List organizations
 * const orgs = await harness.organizations.list();
 *
 * // Create a project
 * const project = await harness.projects.create({
 *   identifier: 'my_project',
 *   orgIdentifier: 'default',
 *   name: 'My Project',
 * });
 *
 * // List pipelines
 * const pipelines = await harness.pipelines.list('default', 'my_project');
 * ```
 */
export class HarnessSDK {
  private client: HarnessClient;

  public readonly organizations: OrganizationsAPI;
  public readonly projects: ProjectsAPI;
  public readonly services: ServicesAPI;
  public readonly environments: EnvironmentsAPI;
  public readonly connectors: ConnectorsAPI;
  public readonly secrets: SecretsAPI;
  public readonly pipelines: PipelinesAPI;
  public readonly infrastructures: InfrastructuresAPI;

  constructor(config: HarnessConfig) {
    this.client = new HarnessClient(config);

    // Initialize all resource APIs
    this.organizations = new OrganizationsAPI(this.client);
    this.projects = new ProjectsAPI(this.client);
    this.services = new ServicesAPI(this.client);
    this.environments = new EnvironmentsAPI(this.client);
    this.connectors = new ConnectorsAPI(this.client);
    this.secrets = new SecretsAPI(this.client);
    this.pipelines = new PipelinesAPI(this.client);
    this.infrastructures = new InfrastructuresAPI(this.client);
  }

  /**
   * Get the underlying HTTP client
   */
  getClient(): HarnessClient {
    return this.client;
  }

  /**
   * Get account ID
   */
  getAccountId(): string {
    return this.client.getAccountId();
  }

  /**
   * Get base URL
   */
  getBaseUrl(): string {
    return this.client.getBaseUrl();
  }
}
