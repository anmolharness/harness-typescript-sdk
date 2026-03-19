/**
 * TemplatesAPI tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HarnessClient } from '../../client.js';
import { TemplatesAPI } from '../../resources/templates.js';
import { createMockResponse } from '../setup.js';

describe('TemplatesAPI', () => {
  let client: HarnessClient;
  let api: TemplatesAPI;

  beforeEach(() => {
    client = new HarnessClient({
      apiKey: 'test-key',
      accountId: 'test-account',
    });
    api = new TemplatesAPI(client);
  });

  it('should list templates', async () => {
    const mockTemplates = [
      {
        identifier: 'template1',
        orgIdentifier: 'org1',
        projectIdentifier: 'proj1',
        name: 'Template 1',
        versionLabel: 'v1',
      },
    ];

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockTemplates));

    const result = await api.list('org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/template/api/templates/list-metadata'),
      expect.any(Object)
    );
    expect(result).toEqual(mockTemplates);
  });

  it('should get template', async () => {
    const mockTemplate = {
      identifier: 'template1',
      orgIdentifier: 'org1',
      projectIdentifier: 'proj1',
      name: 'Template 1',
      versionLabel: 'v1',
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockTemplate));

    const result = await api.get('template1', 'v1', 'org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/template/api/templates/template1'),
      expect.any(Object)
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('versionLabel=v1'),
      expect.any(Object)
    );
    expect(result).toEqual(mockTemplate);
  });

  it('should create template', async () => {
    const yaml = `
template:
  name: My Template
  identifier: my_template
  versionLabel: v1
  type: Step
  spec:
    type: ShellScript
    spec:
      shell: Bash
`;

    const mockTemplate = {
      identifier: 'my_template',
      name: 'My Template',
      versionLabel: 'v1',
    };

    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(mockTemplate));

    const result = await api.create({
      orgIdentifier: 'org1',
      projectIdentifier: 'proj1',
      yaml,
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/template/api/templates'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/yaml',
        }),
        body: yaml,
      })
    );
    expect(result).toEqual(mockTemplate);
  });

  it('should delete template', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(createMockResponse(true));

    const result = await api.delete('template1', 'v1', 'org1', 'proj1');

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/template/api/templates/template1/v1'),
      expect.objectContaining({
        method: 'DELETE',
      })
    );
    expect(result).toEqual(true);
  });
});
