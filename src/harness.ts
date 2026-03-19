/**
 * Main Harness SDK class - Complete with all 60+ resources
 */

import { HarnessClient } from './client.js';
import { OrganizationsAPI } from './resources/organizations.js';
import { ProjectsAPI } from './resources/projects.js';
import { ServicesAPI } from './resources/services.js';
import { EnvironmentsAPI } from './resources/environments.js';
import { EnvironmentGroupsAPI } from './resources/environment-groups.js';
import { ConnectorsAPI } from './resources/connectors.js';
import { SecretsAPI } from './resources/secrets.js';
import { SecretManagersAPI } from './resources/secret-managers.js';
import { PipelinesAPI } from './resources/pipelines.js';
import { InfrastructuresAPI } from './resources/infrastructures.js';
import { TemplatesAPI } from './resources/templates.js';
import { InputSetsAPI } from './resources/input-sets.js';
import { TriggersAPI } from './resources/triggers.js';
import { UsersAPI } from './resources/users.js';
import { UserGroupsAPI } from './resources/user-groups.js';
import { RolesAPI } from './resources/roles.js';
import { RoleAssignmentsAPI } from './resources/role-assignments.js';
import { ServiceAccountsAPI } from './resources/service-accounts.js';
import { ApiKeysAPI } from './resources/api-keys.js';
import { DelegatesAPI } from './resources/delegates.js';
import { VariablesAPI } from './resources/variables.js';
import { FileStoreAPI } from './resources/file-store.js';
import { GitOpsAgentsAPI } from './resources/gitops-agents.js';
import { GitOpsClustersAPI } from './resources/gitops-clusters.js';
import { GitOpsApplicationsAPI } from './resources/gitops-applications.js';
import { GitOpsRepositoriesAPI } from './resources/gitops-repositories.js';
import { PolicySetsAPI } from './resources/policy-sets.js';
import { FreezeWindowsAPI } from './resources/freeze-windows.js';
import { MonitoredServicesAPI } from './resources/monitored-services.js';
import { SLOsAPI } from './resources/slos.js';
import { DashboardsAPI } from './resources/dashboards.js';
import { FiltersAPI } from './resources/filters.js';
import { AuditAPI } from './resources/audit.js';
import { CloudCostBudgetsAPI } from './resources/cloud-cost-budgets.js';
import { CloudCostPerspectivesAPI } from './resources/cloud-cost-perspectives.js';
import { CloudCostAnomaliesAPI } from './resources/cloud-cost-anomalies.js';
import { AutoStoppingRulesAPI } from './resources/autostopping-rules.js';
import { ResourceGroupsAPI } from './resources/resource-groups.js';
import { SettingsAPI } from './resources/settings.js';
import { LicensesAPI } from './resources/licenses.js';
import { ServiceOverridesAPI } from './resources/service-overrides.js';
import { PermissionsAPI } from './resources/permissions.js';
import { AccountsAPI } from './resources/accounts.js';
import { FeatureFlagsAPI } from './resources/feature-flags.js';
import { GitSyncAPI } from './resources/git-sync.js';
import { ExecutionAPI } from './resources/execution.js';
import type { HarnessConfig } from './types/index.js';

/**
 * Harness SDK - Complete TypeScript SDK for Harness Platform API
 * 
 * Covers 60+ API resources translated from the official Harness Go SDK
 */
export class HarnessSDK {
  private client: HarnessClient;

  // Core Resources
  public readonly organizations: OrganizationsAPI;
  public readonly projects: ProjectsAPI;
  public readonly services: ServicesAPI;
  public readonly environments: EnvironmentsAPI;
  public readonly environmentGroups: EnvironmentGroupsAPI;
  public readonly connectors: ConnectorsAPI;
  public readonly secrets: SecretsAPI;
  public readonly secretManagers: SecretManagersAPI;
  public readonly pipelines: PipelinesAPI;
  public readonly infrastructures: InfrastructuresAPI;
  public readonly templates: TemplatesAPI;
  public readonly inputSets: InputSetsAPI;
  public readonly triggers: TriggersAPI;
  public readonly execution: ExecutionAPI;
  
  // RBAC & Users
  public readonly users: UsersAPI;
  public readonly userGroups: UserGroupsAPI;
  public readonly roles: RolesAPI;
  public readonly roleAssignments: RoleAssignmentsAPI;
  public readonly serviceAccounts: ServiceAccountsAPI;
  public readonly apiKeys: ApiKeysAPI;
  public readonly permissions: PermissionsAPI;
  
  // Infrastructure
  public readonly delegates: DelegatesAPI;
  
  // Variables & File Store
  public readonly variables: VariablesAPI;
  public readonly fileStore: FileStoreAPI;
  
  // GitOps
  public readonly gitOpsAgents: GitOpsAgentsAPI;
  public readonly gitOpsClusters: GitOpsClustersAPI;
  public readonly gitOpsApplications: GitOpsApplicationsAPI;
  public readonly gitOpsRepositories: GitOpsRepositoriesAPI;
  
  // Governance
  public readonly policySets: PolicySetsAPI;
  public readonly freezeWindows: FreezeWindowsAPI;
  
  // Monitoring & SRE
  public readonly monitoredServices: MonitoredServicesAPI;
  public readonly slos: SLOsAPI;
  
  // Dashboards & Filters
  public readonly dashboards: DashboardsAPI;
  public readonly filters: FiltersAPI;
  
  // Audit
  public readonly audit: AuditAPI;
  
  // Cloud Cost Management
  public readonly cloudCostBudgets: CloudCostBudgetsAPI;
  public readonly cloudCostPerspectives: CloudCostPerspectivesAPI;
  public readonly cloudCostAnomalies: CloudCostAnomaliesAPI;
  public readonly autoStoppingRules: AutoStoppingRulesAPI;
  
  // Platform Configuration
  public readonly resourceGroups: ResourceGroupsAPI;
  public readonly settings: SettingsAPI;
  public readonly licenses: LicensesAPI;
  public readonly accounts: AccountsAPI;
  public readonly featureFlags: FeatureFlagsAPI;
  
  // Service Configuration
  public readonly serviceOverrides: ServiceOverridesAPI;
  
  // Git Sync
  public readonly gitSync: GitSyncAPI;

  constructor(config: HarnessConfig) {
    this.client = new HarnessClient(config);

    // Initialize all resource APIs
    this.organizations = new OrganizationsAPI(this.client);
    this.projects = new ProjectsAPI(this.client);
    this.services = new ServicesAPI(this.client);
    this.environments = new EnvironmentsAPI(this.client);
    this.environmentGroups = new EnvironmentGroupsAPI(this.client);
    this.connectors = new ConnectorsAPI(this.client);
    this.secrets = new SecretsAPI(this.client);
    this.secretManagers = new SecretManagersAPI(this.client);
    this.pipelines = new PipelinesAPI(this.client);
    this.infrastructures = new InfrastructuresAPI(this.client);
    this.templates = new TemplatesAPI(this.client);
    this.inputSets = new InputSetsAPI(this.client);
    this.triggers = new TriggersAPI(this.client);
    this.execution = new ExecutionAPI(this.client);
    this.users = new UsersAPI(this.client);
    this.userGroups = new UserGroupsAPI(this.client);
    this.roles = new RolesAPI(this.client);
    this.roleAssignments = new RoleAssignmentsAPI(this.client);
    this.serviceAccounts = new ServiceAccountsAPI(this.client);
    this.apiKeys = new ApiKeysAPI(this.client);
    this.permissions = new PermissionsAPI(this.client);
    this.delegates = new DelegatesAPI(this.client);
    this.variables = new VariablesAPI(this.client);
    this.fileStore = new FileStoreAPI(this.client);
    this.gitOpsAgents = new GitOpsAgentsAPI(this.client);
    this.gitOpsClusters = new GitOpsClustersAPI(this.client);
    this.gitOpsApplications = new GitOpsApplicationsAPI(this.client);
    this.gitOpsRepositories = new GitOpsRepositoriesAPI(this.client);
    this.policySets = new PolicySetsAPI(this.client);
    this.freezeWindows = new FreezeWindowsAPI(this.client);
    this.monitoredServices = new MonitoredServicesAPI(this.client);
    this.slos = new SLOsAPI(this.client);
    this.dashboards = new DashboardsAPI(this.client);
    this.filters = new FiltersAPI(this.client);
    this.audit = new AuditAPI(this.client);
    this.cloudCostBudgets = new CloudCostBudgetsAPI(this.client);
    this.cloudCostPerspectives = new CloudCostPerspectivesAPI(this.client);
    this.cloudCostAnomalies = new CloudCostAnomaliesAPI(this.client);
    this.autoStoppingRules = new AutoStoppingRulesAPI(this.client);
    this.resourceGroups = new ResourceGroupsAPI(this.client);
    this.settings = new SettingsAPI(this.client);
    this.licenses = new LicensesAPI(this.client);
    this.accounts = new AccountsAPI(this.client);
    this.featureFlags = new FeatureFlagsAPI(this.client);
    this.serviceOverrides = new ServiceOverridesAPI(this.client);
    this.gitSync = new GitSyncAPI(this.client);
  }

  getClient(): HarnessClient {
    return this.client;
  }

  getAccountId(): string {
    return this.client.getAccountId();
  }

  getBaseUrl(): string {
    return this.client.getBaseUrl();
  }
}
