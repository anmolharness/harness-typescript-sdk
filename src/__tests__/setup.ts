/**
 * Test setup and utilities
 */

import { vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

// Helper to create mock responses
export function createMockResponse<T>(data: T, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: async () => ({ status: 'SUCCESS', data }),
    text: async () => JSON.stringify({ status: 'SUCCESS', data }),
  } as Response;
}

export function createMockErrorResponse(status: number, message: string): Response {
  return {
    ok: false,
    status,
    statusText: 'Error',
    json: async () => ({ message }),
    text: async () => JSON.stringify({ message }),
  } as Response;
}

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});
