/**
 * CloudCostBudgetsAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { CloudCostBudgetsAPI } from '../../resources/cloud-cost-budgets.js';
import { createMockResponse } from '../setup.js';

describe('CloudCostBudgetsAPI', () => {
  let client: HarnessClient;
  let api: CloudCostBudgetsAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new CloudCostBudgetsAPI(client);
  });

  it('should list budgets', async () => {
    const mockBudgets = [
      { uuid: 'budget1', name: 'Budget 1', budgetAmount: 10000 },
      { uuid: 'budget2', name: 'Budget 2', budgetAmount: 20000 },
    ];

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockBudgets));

    const result = await api.list();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ccm/api/budgets'),
      expect.any(Object)
    );
    expect(result).toEqual(mockBudgets);
  });

  it('should get budget', async () => {
    const mockBudget = {
      uuid: 'budget1',
      name: 'Budget 1',
      budgetAmount: 10000,
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockBudget));

    const result = await api.get('budget1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ccm/api/budgets/budget1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockBudget);
  });

  it('should create budget', async () => {
    const createData = {
      name: 'New Budget',
      budgetAmount: 15000,
      type: 'SPECIFIED_AMOUNT' as const,
      period: 'MONTHLY' as const,
    };

    const mockBudget = { uuid: 'new-budget', ...createData };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockBudget));

    const result = await api.create(createData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ccm/api/budgets'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(createData),
      })
    );
    expect(result).toEqual(mockBudget);
  });

  it('should update budget', async () => {
    const updateData = {
      name: 'Updated Budget',
      budgetAmount: 25000,
    };

    const mockBudget = { uuid: 'budget1', ...updateData };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockBudget));

    const result = await api.update('budget1', updateData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ccm/api/budgets/budget1'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(updateData),
      })
    );
    expect(result).toEqual(mockBudget);
  });

  it('should delete budget', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await api.delete('budget1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ccm/api/budgets/budget1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toEqual(true);
  });
});
