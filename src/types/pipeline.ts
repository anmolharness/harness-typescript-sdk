/**
 * Pipeline types
 */

export interface Pipeline {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  yaml?: string;
  stageCount?: number;
  createdAt?: number;
  lastModifiedAt?: number;
}

export interface CreatePipelineRequest {
  identifier: string;
  orgIdentifier: string;
  projectIdentifier: string;
  name: string;
  description?: string;
  tags?: Record<string, string>;
  yaml: string;
}

export interface UpdatePipelineRequest {
  name?: string;
  description?: string;
  tags?: Record<string, string>;
  yaml?: string;
}

export interface ExecutePipelineRequest {
  runtimeInputYaml?: string;
  inputSetReferences?: string[];
  notifyOnlyUser?: boolean;
}

export interface PipelineExecution {
  planExecutionId: string;
  status: string;
  startedAt?: number;
  endedAt?: number;
}
