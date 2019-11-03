export interface SimpleJiraClient<Issue, Schema> {
    getIssue(key: string): Promise<Issue>;
    getSchema(key: string): Promise<Schema>;
}
export declare type URL = string;
export declare type Never<T> = {
    [P in keyof T]?: never;
};
