#!/usr/bin/env node
import { RawIssueMetadata } from "./types/RawIssueMetadata";
import { SimpleJiraClient } from "./types";
import { ParsedIssue } from "./types/ParsedIssue";
import { RawIssue } from "./types/RawIssue";
export declare function printParsedIssue(simpleJiraClient: SimpleJiraClient<ParsedIssue, void>, key: string): Promise<void>;
export declare function printRawIssue(simpleJiraClient: SimpleJiraClient<RawIssue, RawIssueMetadata>, key: string): Promise<void>;
