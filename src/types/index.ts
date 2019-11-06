export interface SimpleJiraClient<Issue, Schema> {
  getIssue (key: string): Promise<Issue>;

  getSchema (key: string): Promise<Schema>;
}

export interface Pingable {
  /**
   * Return false if server is
   * * inaccessible
   * * invalid user credentials
   * Otherwise return true
   */
  ping (): Promise<boolean>;
}

export type URL = string;

export type Never<T> = {
  [P in keyof T]?: never;
};
