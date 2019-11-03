import { Base64Token, BasicAuth, UserAndToken } from "./client-libs/basic-auth-behavior";
import { RawIssueMetadata } from "./types/RawIssueMetadata";
import { SimpleJiraClient } from "./types";
import { RawIssue } from "./types/RawIssue";
export declare class RawJiraBasicAuth implements SimpleJiraClient<RawIssue, RawIssueMetadata> {
    private readonly url;
    private readonly token;
    constructor(url: string, credentials: UserAndToken | Base64Token, tokenProvider?: BasicAuth);
    getIssue(key: string): Promise<RawIssue>;
    getSchema(key: string): Promise<RawIssueMetadata>;
    private getApi2;
}
export declare class MockedRawJiraBasicAuth extends RawJiraBasicAuth {
    getIssue(key: string): Promise<RawIssue>;
    getSchema(key: string): Promise<RawIssueMetadata>;
}
