"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const mock_helpers_1 = require("./client-libs/mock-helpers");
const basic_auth_behavior_1 = require("./client-libs/basic-auth-behavior");
class RawJiraBasicAuth {
    constructor(url, credentials, tokenProvider = new basic_auth_behavior_1.BasicAuth()) {
        this.token = tokenProvider.getToken(credentials);
        this.url = url;
    }
    getIssue(key) {
        return this.getApi2(`issue/${key}`);
    }
    getSchema(key) {
        return this.getApi2(`issue/${key}/metadata`);
    }
    async getApi2(path) {
        return await request_promise_native_1.default({
            headers: { Authorization: `Basic ${this.token}`, "Content-Type": "application/json" },
            json: true,
            url: `${this.url}/rest/api/2/${path}`,
        });
    }
}
exports.RawJiraBasicAuth = RawJiraBasicAuth;
class MockedRawJiraBasicAuth extends RawJiraBasicAuth {
    async getIssue(key) {
        return mock_helpers_1.readJson(path_1.join("issue", key, "200.json"));
    }
    async getSchema(key) {
        return mock_helpers_1.readJson(path_1.join("issue", key, "metadata", "200.json"));
    }
}
exports.MockedRawJiraBasicAuth = MockedRawJiraBasicAuth;
//# sourceMappingURL=RawJiraBasicAuth.js.map