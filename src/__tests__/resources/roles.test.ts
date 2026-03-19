/**
 * RolesAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { RolesAPI } from '../../resources/roles.js';
import { createMockResponse } from '../setup.js';

describe('RolesAPI', () => {
  let client: HarnessClient;
  let api: RolesAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new RolesAPI(client);
  });

  it('should list roles', async () => {
    const mockRoles = [
      { identifier: 'role1', name: 'Role 1', permissions: [] },
      { identifier: 'role2', name: 'Role 2', permissions: [] },
    ];

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockRoles));

    const result = await api.list();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/roles'),
      expect.any(Object)
    );
    expect(result).toEqual(mockRoles);
  });

  it('should get role', async () => {
    const mockRole = {
      identifier: 'role1',
      name: 'Role 1',
      permissions: ['core_user_view'],
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockRole));

    const result = await api.get('role1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/roles/role1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockRole);
  });

  it('should create role', async () => {
    const createData = {
      identifier: 'new-role',
      name: 'New Role',
      permissions: ['core_user_view', 'core_project_view'],
    };

    const mockRole = { ...createData };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockRole));

    const result = await api.create(createData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/roles'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ role: createData }),
      })
    );
    expect(result).toEqual(mockRole);
  });

  it('should update role', async () => {
    const updateData = {
      name: 'Updated Role',
      permissions: ['core_user_edit'],
    };

    const mockRole = { identifier: 'role1', ...updateData };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockRole));

    const result = await api.update('role1', updateData);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/roles/role1'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ role: updateData }),
      })
    );
    expect(result).toEqual(mockRole);
  });

  it('should delete role', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await api.delete('role1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/roles/role1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toEqual(true);
  });
});
