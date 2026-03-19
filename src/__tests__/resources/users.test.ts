/**
 * UsersAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { UsersAPI } from '../../resources/users.js';
import { createMockResponse } from '../setup.js';
import type { User } from '../../types/user.js';

describe('UsersAPI', () => {
  let client: HarnessClient;
  let api: UsersAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new UsersAPI(client);
  });

  it('should list users', async () => {
    const mockUsers: User[] = [
      { uuid: 'user1', email: 'user1@example.com', name: 'User 1' },
      { uuid: 'user2', email: 'user2@example.com', name: 'User 2' },
    ];

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockUsers));

    const result = await api.list();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/users'),
      expect.any(Object)
    );
    expect(result).toEqual(mockUsers);
  });

  it('should get user by id', async () => {
    const mockUser: User = {
      uuid: 'user1',
      email: 'user1@example.com',
      name: 'User 1',
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockUser));

    const result = await api.get('user1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/users/user1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockUser);
  });

  it('should add user', async () => {
    const email = 'newuser@example.com';
    const roleAssignments = [
      { roleIdentifier: 'role1', resourceGroupIdentifier: 'rg1' },
    ];

    const mockUser: User = {
      uuid: 'new-user-id',
      email: 'newuser@example.com',
      name: 'New User',
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockUser));

    const result = await api.addUser(email, roleAssignments);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/users'),
      expect.objectContaining({
        method: 'POST',
      })
    );
    expect(result).toEqual(mockUser);
  });

  it('should remove user', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await api.remove('user1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/ng/api/users/user1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toEqual(true);
  });
});
