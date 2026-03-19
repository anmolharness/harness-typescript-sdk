/**
 * GitOpsAgentsAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { GitOpsAgentsAPI } from '../../resources/gitops-agents.js';
import { createMockResponse } from '../setup.js';

describe('GitOpsAgentsAPI', () => {
  let client: HarnessClient;
  let api: GitOpsAgentsAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new GitOpsAgentsAPI(client);
  });

  it('should list agents', async () => {
    const mockAgents = [
      { identifier: 'agent1', name: 'Agent 1', agentIdentifier: 'agent-1' },
      { identifier: 'agent2', name: 'Agent 2', agentIdentifier: 'agent-2' },
    ];

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockAgents));

    const result = await api.list('org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/gitops/agents'),
      expect.any(Object)
    );
    expect(result).toEqual(mockAgents);
  });

  it('should get agent', async () => {
    const mockAgent = {
      identifier: 'agent1',
      name: 'Agent 1',
      agentIdentifier: 'agent-1',
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockAgent));

    const result = await api.get('agent1', 'org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/gitops/agents/agent1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockAgent);
  });

  it('should create agent', async () => {
    const createData = {
      identifier: 'new-agent',
      orgIdentifier: 'org1',
      projectIdentifier: 'proj1',
      name: 'New Agent',
      type: 'MANAGED_ARGO_PROVIDER' as const,
    };

    const mockAgent = { ...createData, agentIdentifier: 'new-agent-id' };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockAgent));

    const result = await api.create(createData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/gitops/agents'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ agent: createData }),
      })
    );
    expect(result).toEqual(mockAgent);
  });

  it('should delete agent', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await api.delete('agent1', 'org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/gitops/agents/agent1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toEqual(true);
  });
});
