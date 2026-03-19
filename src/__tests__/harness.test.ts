/**
 * HarnessSDK tests
 */

import { describe, it, expect } from 'vitest';
import { HarnessSDK } from '../harness.js';

describe('HarnessSDK', () => {
  const config = {
    apiKey: 'test-key',
    accountId: 'test-account',
  };

  it('should initialize with config', () => {
    const sdk = new HarnessSDK(config);
    expect(sdk).toBeDefined();
    expect(sdk.organizations).toBeDefined();
    expect(sdk.projects).toBeDefined();
    expect(sdk.pipelines).toBeDefined();
  });

  it('should initialize all 102 resource APIs', () => {
    const sdk = new HarnessSDK(config);

    // Core Platform (15)
    expect(sdk.organizations).toBeDefined();
    expect(sdk.projects).toBeDefined();
    expect(sdk.services).toBeDefined();
    expect(sdk.environments).toBeDefined();
    expect(sdk.environmentGroups).toBeDefined();
    expect(sdk.connectors).toBeDefined();
    expect(sdk.secrets).toBeDefined();
    expect(sdk.secretManagers).toBeDefined();
    expect(sdk.pipelines).toBeDefined();
    expect(sdk.infrastructures).toBeDefined();
    expect(sdk.templates).toBeDefined();
    expect(sdk.inputSets).toBeDefined();
    expect(sdk.triggers).toBeDefined();
    expect(sdk.execution).toBeDefined();
    expect(sdk.executionDetails).toBeDefined();

    // RBAC & Access (11)
    expect(sdk.users).toBeDefined();
    expect(sdk.userGroups).toBeDefined();
    expect(sdk.invites).toBeDefined();
    expect(sdk.roles).toBeDefined();
    expect(sdk.roleAssignments).toBeDefined();
    expect(sdk.permissions).toBeDefined();
    expect(sdk.serviceAccounts).toBeDefined();
    expect(sdk.apiKeys).toBeDefined();
    expect(sdk.resourceGroups).toBeDefined();
    expect(sdk.resourceTypes).toBeDefined();
    expect(sdk.accessControl).toBeDefined();

    // Infrastructure (7)
    expect(sdk.delegates).toBeDefined();
    expect(sdk.delegateTags).toBeDefined();
    expect(sdk.variables).toBeDefined();
    expect(sdk.variableSets).toBeDefined();
    expect(sdk.fileStore).toBeDefined();
    expect(sdk.hosts).toBeDefined();
    expect(sdk.clusters).toBeDefined();

    // GitOps (9)
    expect(sdk.gitOpsAgents).toBeDefined();
    expect(sdk.gitOpsClusters).toBeDefined();
    expect(sdk.gitOpsApplications).toBeDefined();
    expect(sdk.gitOpsRepositories).toBeDefined();
    expect(sdk.gitSync).toBeDefined();
    expect(sdk.gitFullSync).toBeDefined();
    expect(sdk.gitSyncSettings).toBeDefined();
    expect(sdk.projectMappings).toBeDefined();
    expect(sdk.sourceCodeManager).toBeDefined();

    // Governance (6)
    expect(sdk.policies).toBeDefined();
    expect(sdk.policySets).toBeDefined();
    expect(sdk.policyEnforcement).toBeDefined();
    expect(sdk.freezeWindows).toBeDefined();
    expect(sdk.serviceOverrides).toBeDefined();
    expect(sdk.overrides).toBeDefined();

    // Monitoring & SRE (7)
    expect(sdk.monitoredServices).toBeDefined();
    expect(sdk.slos).toBeDefined();
    expect(sdk.dashboards).toBeDefined();
    expect(sdk.dashboardsFilter).toBeDefined();
    expect(sdk.dashboardsFolder).toBeDefined();
    expect(sdk.filters).toBeDefined();
    expect(sdk.audit).toBeDefined();

    // Cloud Cost Management (15)
    expect(sdk.cloudCostBudgets).toBeDefined();
    expect(sdk.cloudCostPerspectives).toBeDefined();
    expect(sdk.cloudCostPerspectiveReports).toBeDefined();
    expect(sdk.cloudCostAnomalies).toBeDefined();
    expect(sdk.cloudCostRecommendations).toBeDefined();
    expect(sdk.cloudCostRecommendationDetails).toBeDefined();
    expect(sdk.autoStoppingRules).toBeDefined();
    expect(sdk.autoStoppingRulesV2).toBeDefined();
    expect(sdk.autoStoppingAlerts).toBeDefined();
    expect(sdk.cloudCostFixedSchedules).toBeDefined();
    expect(sdk.cloudCostLoadBalancers).toBeDefined();
    expect(sdk.cloudCostClusterOrchestrator).toBeDefined();
    expect(sdk.cloudCostDetails).toBeDefined();
    expect(sdk.gcpProjects).toBeDefined();
    expect(sdk.auditFilters).toBeDefined();

    // Notifications (4)
    expect(sdk.notificationChannels).toBeDefined();
    expect(sdk.notificationRules).toBeDefined();
    expect(sdk.notificationAttachments).toBeDefined();
    expect(sdk.notificationTemplates).toBeDefined();

    // Platform Services (8)
    expect(sdk.accounts).toBeDefined();
    expect(sdk.accountSettings).toBeDefined();
    expect(sdk.accountDataSinks).toBeDefined();
    expect(sdk.settings).toBeDefined();
    expect(sdk.licenses).toBeDefined();
    expect(sdk.usage).toBeDefined();
    expect(sdk.featureFlags).toBeDefined();
    expect(sdk.authenticationSettings).toBeDefined();

    // CI/CD Advanced (3)
    expect(sdk.ciExecutionConfig).toBeDefined();
    expect(sdk.pipelinesDashboard).toBeDefined();
    expect(sdk.webhookTriggers).toBeDefined();

    // IACM (1)
    expect(sdk.iacmWorkspaces).toBeDefined();
  });

  it('should use default baseUrl if not provided', () => {
    const sdk = new HarnessSDK(config);
    expect(sdk.client.getBaseUrl()).toBe('https://app.harness.io');
  });

  it('should use custom baseUrl if provided', () => {
    const sdk = new HarnessSDK({
      ...config,
      baseUrl: 'https://custom.harness.io',
    });
    expect(sdk.client.getBaseUrl()).toBe('https://custom.harness.io');
  });

  it('should expose client for advanced usage', () => {
    const sdk = new HarnessSDK(config);
    expect(sdk.client).toBeDefined();
    expect(sdk.client.getAccountId()).toBe('test-account');
  });
});
