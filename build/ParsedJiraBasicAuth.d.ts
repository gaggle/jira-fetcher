import { Base64Token, BasicAuth, UserAndToken } from "./client-libs/basic-auth-behavior";
import { ParsedIssue } from "./types/ParsedIssue";
import { Pingable, SimpleJiraClient } from "./types";
import { RawIssue } from "./types/RawIssue";
declare type ParsedJiraClient = SimpleJiraClient<ParsedIssue, void> & Pingable;
export declare class ParsedJiraBasicAuth implements ParsedJiraClient {
    private readonly url;
    private readonly token;
    constructor(url: string, credentials: UserAndToken | Base64Token, tokenProvider?: BasicAuth);
    getIssue(key: string): Promise<ParsedIssue>;
    getSchema(key: string): Promise<void>;
    ping(): Promise<boolean>;
    private getApi2;
    private getApi3;
    protected converter(issue: RawIssue): ParsedIssue;
}
export declare class MockedParsedJiraBasicAuth extends ParsedJiraBasicAuth {
    getIssue(key: string): Promise<ParsedIssue>;
    getSchema(key: string): Promise<void>;
}
export {};
