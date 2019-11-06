export interface SimpleJiraClient<Issue, Schema> {
  getIssue(key: string): Promise<Issue>;

  getSchema(key: string): Promise<Schema>;
}

export type URL = string;

export type Never<T> = {
  [P in keyof T]?: never;
};
