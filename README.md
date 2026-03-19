# Harness TypeScript SDK

TypeScript SDK for the Harness Platform API. Based on the official [Harness Go SDK](https://github.com/harness/harness-go-sdk) structure.

## Installation

```bash
npm install harness-typescript-sdk
```

## Quick Start

```typescript
import { HarnessSDK } from 'harness-typescript-sdk';

const harness = new HarnessSDK({
  apiKey: 'your-api-key',
  accountId: 'your-account-id',
});

// List organizations
const orgs = await harness.organizations.list();

// Create a project
const project = await harness.projects.create({
  identifier: 'my_project',
  orgIdentifier: 'default',
  name: 'My Project',
  description: 'My project description',
});

// List services
const services = await harness.services.list('default', 'my_project');
```

## Configuration

```typescript
const harness = new HarnessSDK({
  apiKey: 'your-api-key',        // Required: Harness API key (PAT or SAT)
  accountId: 'your-account-id',  // Required: Harness account identifier
  baseUrl: 'https://app.harness.io', // Optional: Custom base URL
  timeout: 30000,                // Optional: Request timeout in ms (default: 30000)
});
```

## API Resources

### Organizations

```typescript
// List organizations
const orgs = await harness.organizations.list({ limit: 10 });

// Get organization
const org = await harness.organizations.get('my_org');

// Create organization
const org = await harness.organizations.create({
  identifier: 'my_org',
  name: 'My Organization',
});

// Update organization
await harness.organizations.update('my_org', {
  name: 'Updated Name',
});

// Delete organization
await harness.organizations.delete('my_org');
```

### Projects

```typescript
// List projects
const projects = await harness.projects.list('my_org');

// Get project
const project = await harness.projects.get('my_org', 'my_project');

// Create project
const project = await harness.projects.create({
  identifier: 'my_project',
  orgIdentifier: 'my_org',
  name: 'My Project',
});

// Update project
await harness.projects.update('my_org', 'my_project', {
  description: 'Updated description',
});

// Delete project
await harness.projects.delete('my_org', 'my_project');
```

### Services

```typescript
// List services
const services = await harness.services.list('my_org', 'my_project');

// Get service
const service = await harness.services.get('my_org', 'my_project', 'my_service');

// Create service
const service = await harness.services.create({
  identifier: 'my_service',
  orgIdentifier: 'my_org',
  projectIdentifier: 'my_project',
  name: 'My Service',
});

// Delete service
await harness.services.delete('my_org', 'my_project', 'my_service');
```

### Environments

```typescript
// List environments
const envs = await harness.environments.list('my_org', 'my_project');

// Create environment
const env = await harness.environments.create({
  identifier: 'production',
  orgIdentifier: 'my_org',
  projectIdentifier: 'my_project',
  name: 'Production',
  type: 'Production',
});
```

### Connectors

```typescript
// List connectors (account-level)
const connectors = await harness.connectors.list();

// List connectors (project-level)
const connectors = await harness.connectors.list('my_org', 'my_project');

// Get connector
const connector = await harness.connectors.get('my_connector', 'my_org', 'my_project');

// Test connection
const result = await harness.connectors.testConnection('my_connector');
```

### Secrets

```typescript
// List secrets
const secrets = await harness.secrets.list('my_org', 'my_project');

// Create secret
const secret = await harness.secrets.create({
  identifier: 'my_secret',
  orgIdentifier: 'my_org',
  projectIdentifier: 'my_project',
  name: 'My Secret',
  type: 'SecretText',
  spec: {
    secretManagerIdentifier: 'harnessSecretManager',
    valueType: 'Inline',
    value: 'secret-value',
  },
});
```

### Pipelines

```typescript
// List pipelines
const pipelines = await harness.pipelines.list('my_org', 'my_project');

// Get pipeline
const pipeline = await harness.pipelines.get('my_org', 'my_project', 'my_pipeline');

// Create pipeline
const pipeline = await harness.pipelines.create({
  identifier: 'my_pipeline',
  orgIdentifier: 'my_org',
  projectIdentifier: 'my_project',
  name: 'My Pipeline',
  yaml: pipelineYaml,
});

// Execute pipeline
const execution = await harness.pipelines.execute('my_org', 'my_project', 'my_pipeline');

// Get execution status
const status = await harness.pipelines.getExecution('my_org', 'my_project', execution.planExecutionId);
```

### Infrastructures

```typescript
// List infrastructures
const infras = await harness.infrastructures.list('my_org', 'my_project', 'my_env');

// Create infrastructure
const infra = await harness.infrastructures.create({
  identifier: 'my_k8s_infra',
  orgIdentifier: 'my_org',
  projectIdentifier: 'my_project',
  environmentRef: 'production',
  name: 'Kubernetes Infrastructure',
  type: 'KubernetesDirect',
  deploymentType: 'Kubernetes',
});
```

## Error Handling

```typescript
try {
  await harness.projects.get('my_org', 'nonexistent');
} catch (error) {
  const harnessError = JSON.parse(error.message);
  console.error(`Error ${harnessError.code}: ${harnessError.message}`);
  console.error('Status:', harnessError.status);
  console.error('Details:', harnessError.details);
}
```

## TypeScript Support

The SDK is fully typed with TypeScript definitions:

```typescript
import type {
  Organization,
  Project,
  Service,
  Pipeline,
  CreateProjectRequest
} from 'harness-typescript-sdk';

const request: CreateProjectRequest = {
  identifier: 'my_project',
  orgIdentifier: 'my_org',
  name: 'My Project',
};
```

## Coverage

Current resource coverage (based on Harness Go SDK):

- ✅ Organizations
- ✅ Projects
- ✅ Services
- ✅ Environments
- ✅ Connectors
- ✅ Secrets
- ✅ Pipelines
- ✅ Infrastructure Definitions
- 🚧 Templates (coming soon)
- 🚧 Input Sets (coming soon)
- 🚧 Triggers (coming soon)
- 🚧 Delegates (coming soon)
- 🚧 Service Accounts (coming soon)
- 🚧 API Keys (coming soon)
- 🚧 Roles & Permissions (coming soon)
- 🚧 User Groups (coming soon)
- 🚧 GitOps (coming soon)

The Go SDK covers 105+ API services. This TypeScript SDK implements the core resources first, with more coming soon.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Type check
npm run typecheck

# Watch mode
npm run dev
```

## License

MIT

## Related

- [Harness Go SDK](https://github.com/harness/harness-go-sdk) - Official Go SDK
- [Harness API Docs](https://apidocs.harness.io/) - API Reference
- [Harness Developer Hub](https://developer.harness.io/) - Documentation
