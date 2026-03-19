# Harness TypeScript SDK

## What This Is
Official TypeScript SDK for the Harness Platform API, translated from the [Harness Go SDK](https://github.com/harness/harness-go-sdk).

## Project Structure
```
harness-typescript-sdk/
├── src/
│   ├── index.ts              # Main export
│   ├── client.ts             # Core HTTP client with auth
│   ├── harness.ts            # Main SDK class
│   ├── types/                # TypeScript type definitions
│   │   ├── common.ts         # Shared types (config, errors, pagination)
│   │   ├── organization.ts
│   │   ├── project.ts
│   │   ├── service.ts
│   │   ├── environment.ts
│   │   ├── connector.ts
│   │   ├── secret.ts
│   │   ├── pipeline.ts
│   │   ├── infrastructure.ts
│   │   └── index.ts
│   └── resources/            # API resource classes
│       ├── organizations.ts  # Organizations API
│       ├── projects.ts       # Projects API
│       ├── services.ts       # Services API
│       ├── environments.ts   # Environments API
│       ├── connectors.ts     # Connectors API
│       ├── secrets.ts        # Secrets API
│       ├── pipelines.ts      # Pipelines API
│       └── infrastructures.ts # Infrastructure Definitions API
├── examples/
│   ├── basic-usage.ts        # Discovery/list examples
│   └── create-resources.ts   # Create resource examples
├── dist/                     # Compiled output (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Tech Stack
- **TypeScript 5.6** — Full type safety
- **ESM modules** — Modern module system
- **Native fetch** — No external HTTP library dependencies
- **Zero runtime deps** — Only dev dependencies for build tools

## Implementation Status

### Implemented (8 core resources)
- ✅ Organizations — CRUD operations
- ✅ Projects — CRUD operations
- ✅ Services — CRUD operations
- ✅ Environments — CRUD operations
- ✅ Connectors — CRUD + test connection
- ✅ Secrets — CRUD operations
- ✅ Pipelines — CRUD + execute + get execution
- ✅ Infrastructure Definitions — CRUD operations

### Remaining (from Go SDK's 105 services)
- 🚧 Templates
- 🚧 Input Sets
- 🚧 Triggers
- 🚧 Delegates
- 🚧 Service Accounts
- 🚧 API Keys
- 🚧 Roles & Permissions
- 🚧 User Groups
- 🚧 Secret Managers
- 🚧 GitOps (Applications, Agents, Clusters, Repositories)
- 🚧 Variables
- 🚧 File Store
- 🚧 Filters
- 🚧 Dashboards
- 🚧 Cloud Cost Management (Budgets, Anomalies, Perspectives)
- 🚧 Audit
- 🚧 Governance (OPA Policies, Rule Sets)
- 🚧 Authentication Settings
- 🚧 SCIM
- 🚧 Service Overrides
- 🚧 Freeze Windows
- ...and 80+ more

## Design Patterns

### Client Architecture
- **HarnessClient** — Low-level HTTP client
  - Handles auth (`x-api-key` header)
  - Manages request/response lifecycle
  - Auto-unwraps `ResponseDTO<T>`
  - Supports JSON and YAML content types
  - Error handling with structured errors

- **HarnessSDK** — High-level SDK class
  - Exposes resource-based API (`.organizations`, `.projects`, etc.)
  - Single entry point for all operations
  - Resource classes initialized once

### API Endpoint Patterns (from Go SDK)
```typescript
// Legacy NG API (most resources)
/ng/api/organizations
/ng/api/projects
/ng/api/servicesV2
/ng/api/environmentsV2
/ng/api/connectors
/ng/api/v2/secrets
/ng/api/infrastructures

// Pipeline API (different base)
/pipeline/api/pipelines/v2
/pipeline/api/pipelines/execute/{id}

// Template API
/template/api/templates/list-metadata
```

### Auth Pattern
All requests include:
```typescript
headers: {
  'x-api-key': apiKey,
  'Content-Type': 'application/json' | 'application/yaml'
}
queryParams: {
  accountIdentifier: accountId,
  orgIdentifier?: orgId,      // Org-scoped
  projectIdentifier?: projectId // Project-scoped
}
```

### Response Unwrapping
Harness wraps responses in `ResponseDTO<T>`:
```typescript
{
  "status": "SUCCESS",
  "data": { ...actual data... },
  "correlationId": "..."
}
```
Client automatically unwraps to return just `data`.

## Usage

### Basic Example
```typescript
import { HarnessSDK } from 'harness-typescript-sdk';

const harness = new HarnessSDK({
  apiKey: process.env.HARNESS_API_KEY,
  accountId: process.env.HARNESS_ACCOUNT_ID,
});

// List organizations
const orgs = await harness.organizations.list();

// Create project
const project = await harness.projects.create({
  identifier: 'my_project',
  orgIdentifier: 'default',
  name: 'My Project',
});

// List pipelines
const pipelines = await harness.pipelines.list('default', 'my_project');
```

### Scope Handling
- **Account-scoped**: Organizations, some connectors/secrets
- **Org-scoped**: Projects
- **Project-scoped**: Services, Environments, Pipelines, Infrastructure

```typescript
// Account-level connector
await harness.connectors.list();

// Org-level connector
await harness.connectors.list('my_org');

// Project-level connector
await harness.connectors.list('my_org', 'my_project');
```

## Dev Commands
```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run dev          # Watch mode
npm run typecheck    # Type check without emit
```

## Build Output
- `dist/` — Compiled JavaScript + TypeScript declarations
- ESM modules (`.js`)
- Source maps (`.js.map`)
- Type declarations (`.d.ts`, `.d.ts.map`)

## Next Steps

### High Priority (matching AC-DC usage)
1. Templates API
2. Input Sets API
3. Triggers API
4. Delegates API

### Medium Priority
5. Service Accounts API
6. API Keys API
7. Roles & RBAC API
8. User Groups API
9. Variables API

### Low Priority
10. Cloud Cost Management APIs
11. Governance/OPA APIs
12. GitOps APIs
13. Full coverage of remaining 90+ services

## Translation from Go SDK

### Go → TypeScript Patterns

**Go API Service:**
```go
type OrganizationApiService service

func (a *OrganizationApiService) DeleteOrganization(
  ctx context.Context,
  identifier string,
  accountIdentifier string,
  localVarOptionals *OrganizationApiDeleteOrganizationOpts
) (ResponseDtoBoolean, *http.Response, error)
```

**TypeScript API Class:**
```typescript
export class OrganizationsAPI {
  constructor(private client: HarnessClient) {}

  async delete(identifier: string): Promise<boolean> {
    return this.client.delete<boolean>(`/organizations/${identifier}`);
  }
}
```

**Key differences:**
- Go uses context, optionals, and returns (data, response, error)
- TypeScript uses async/await, throws errors, returns unwrapped data
- Go uses codegen from Swagger → verbose
- TypeScript is hand-written → clean, idiomatic

## Notes
- Built from scratch based on Go SDK structure
- Zero external runtime dependencies
- Full TypeScript type safety
- Compatible with Node.js 18+
- ESM-only (no CommonJS)
- Ready to publish to npm

## Created
2026-03-19 — Initial implementation with 8 core resources
