import { URL } from "./index"

export interface RawIssue {
  expand: string;
  id: string;
  self: URL;
  key: string;
  fields: { [key: string]: RawIssueField | null }
    & {
    issuetype: {
      description: string;
      iconUrl: URL;
      id: string;
      name: string;
      self: URL;
      subtask: boolean;
    };
    description: string;
    labels: string[];
    lastViewed: string;
    subtasks: RawIssueSubtask[];
    summary: string;
    customfield_11120: string | null;
    customfield_11121?: string;
  };
}

type RawIssueField =
  | {
  self: URL;
  value: string;
  id: string;
}
  | {
  hasEpicLinkFieldDependency: boolean;
  showField: boolean;
  nonEditableReason: { reason: string; message: string };
}
  | string

type RawIssueSubtask = {
  id: string;
  key: string;
  self: URL;
  fields: {
    summary: string;
    status: {};
    priority: {};
    issuetype: {};
  };
}
