import { join } from "path"

import request from "request-promise-native"

import { readJson } from "./client-libs/mock-helpers"
import { Base64Token, BasicAuth, UserAndToken } from "./client-libs/basic-auth-behavior"
import { RawIssueMetadata } from "./types/RawIssueMetadata"
import { SimpleJiraClient } from "./types"
import { RawIssue } from "./types/RawIssue"

export class RawJiraBasicAuth implements SimpleJiraClient<RawIssue, RawIssueMetadata> {
  private readonly url: string
  private readonly token: string

  constructor (url: string, credentials: UserAndToken | Base64Token, tokenProvider: BasicAuth = new BasicAuth()) {
    this.token = tokenProvider.getToken(credentials)
    this.url = url
  }

  getIssue (key: string): Promise<RawIssue> {
    return this.getApi2<RawIssue>(`issue/${key}`)
  }

  getSchema (key: string): Promise<RawIssueMetadata> {
    return this.getApi2<RawIssueMetadata>(`issue/${key}/metadata`)
  }

  private async getApi2<T> (path: string): Promise<T> {
    return await request({
      headers: { Authorization: `Basic ${this.token}`, "Content-Type": "application/json" },
      json: true,
      url: `${this.url}/rest/api/2/${path}`,
    }) as T
  }

}

export class MockedRawJiraBasicAuth extends RawJiraBasicAuth {
  async getIssue (key: string): Promise<RawIssue> {
    return readJson<RawIssue>(join("issue", key, "200.json"))
  }

  async getSchema (key: string): Promise<RawIssueMetadata> {
    return readJson<RawIssueMetadata>(join("issue", key, "metadata", "200.json"))
  }
}
