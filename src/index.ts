/**
 * Harness TypeScript SDK
 *
 * TypeScript SDK for the Harness Platform API based on the official Go SDK structure.
 *
 * @packageDocumentation
 */

export { HarnessSDK } from './harness.js';
export { HarnessClient } from './client.js';

// Export all types
export * from './types/index.js';

// Export resource APIs for advanced usage
export { OrganizationsAPI } from './resources/organizations.js';
export { ProjectsAPI } from './resources/projects.js';
export { ServicesAPI } from './resources/services.js';
export { EnvironmentsAPI } from './resources/environments.js';
export { ConnectorsAPI } from './resources/connectors.js';
export { SecretsAPI } from './resources/secrets.js';
export { PipelinesAPI } from './resources/pipelines.js';
export { InfrastructuresAPI } from './resources/infrastructures.js';
