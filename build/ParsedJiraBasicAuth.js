"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const basic_auth_behavior_1 = require("./client-libs/basic-auth-behavior");
const mock_helpers_1 = require("./client-libs/mock-helpers");
class ParsedJiraBasicAuth {
    constructor(url, credentials, tokenProvider = new basic_auth_behavior_1.BasicAuth()) {
        this.token = tokenProvider.getToken(credentials);
        this.url = url;
    }
    async getIssue(key) {
        const issue = await this.getApi2(`issue/${key}`);
        return this.converter(issue);
    }
    async getSchema(key) {
        await this.getApi2(`issue/${key}/metadata`);
    }
    async ping() {
        try {
            await this.getApi3("mypermissions");
            return true;
        }
        catch (err) {
            return false;
        }
    }
    async getApi2(path) {
        return await request_promise_native_1.default({
            headers: { Authorization: `Basic ${this.token}`, "Content-Type": "application/json" },
            json: true,
            url: `${this.url}/rest/api/2/${path}`,
        });
    }
    async getApi3(path) {
        return await request_promise_native_1.default({
            headers: { Authorization: `Basic ${this.token}`, "Content-Type": "application/json" },
            json: true,
            url: `${this.url}/rest/api/3/${path}`,
        });
    }
    converter(issue) {
        switch (issue.fields.issuetype.name) {
            case "Epic":
                return {
                    description: issue.fields.description,
                    epicName: issue.fields.customfield_11121 || null,
                    issuetype: { name: issue.fields.issuetype.name, iconUrl: issue.fields.issuetype.iconUrl },
                    key: issue.key,
                    summary: issue.fields.summary,
                    webUrl: `${this.url}/browse/${issue.key}`,
                };
            case "Story":
                return {
                    description: issue.fields.description,
                    epicKey: issue.fields.customfield_11120,
                    issuetype: { name: issue.fields.issuetype.name, iconUrl: issue.fields.issuetype.iconUrl },
                    key: issue.key,
                    summary: issue.fields.summary,
                    webUrl: `${this.url}/browse/${issue.key}`,
                };
            default:
                throw new Error(`Unknown issue type: ${issue.fields.issuetype.name}`);
        }
    }
}
exports.ParsedJiraBasicAuth = ParsedJiraBasicAuth;
class MockedParsedJiraBasicAuth extends ParsedJiraBasicAuth {
    async getIssue(key) {
        const issue = mock_helpers_1.readJson(path_1.join("issue", key, "200.json"));
        return this.converter(issue);
    }
    async getSchema(key) {
        mock_helpers_1.readJson(path_1.join("issue", key, "metadata", "200.json"));
    }
}
exports.MockedParsedJiraBasicAuth = MockedParsedJiraBasicAuth;
//# sourceMappingURL=ParsedJiraBasicAuth.js.map