export interface RootArgs {
    debugUseMockJira: string;
    server: string;
    token: string;
    user: string;
}
export interface IssueArgs {
    parent: RootArgs;
}
