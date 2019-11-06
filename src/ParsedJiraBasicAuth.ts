import { join } from "path"

import request from "request-promise-native"

import { Base64Token, BasicAuth, UserAndToken } from "./client-libs/basic-auth-behavior"
import { ParsedIssue } from "./types/ParsedIssue"
import { readJson } from "./client-libs/mock-helpers"
import { Pingable, SimpleJiraClient } from "./types"
import { RawIssue } from "./types/RawIssue"
import { RawIssueMetadata } from "./types/RawIssueMetadata"

type ParsedJiraClient = SimpleJiraClient<ParsedIssue, void> & Pingable

type RawMypermissions = { permissions: { [key: string]: { [key: string]: string } } }

export class ParsedJiraBasicAuth implements ParsedJiraClient {
  private readonly url: string
  private readonly token: string

  constructor (url: string, credentials: UserAndToken | Base64Token, tokenProvider: BasicAuth = new BasicAuth()) {
    this.token = tokenProvider.getToken(credentials)
    this.url = url
  }

  async getIssue (key: string): Promise<ParsedIssue> {
    const issue = await this.getApi2<RawIssue>(`issue/${key}`)
    return this.converter(issue)
  }

  async getSchema (key: string): Promise<void> {
    await this.getApi2<RawIssueMetadata>(`issue/${key}/metadata`)
  }

  async ping (): Promise<boolean> {
    try {
      await this.getApi3<RawMypermissions>("mypermissions")
      return true
    } catch (err) {
      return false
    }
  }

  private async getApi2<T> (path: string): Promise<T> {
    return await request({
      headers: { Authorization: `Basic ${this.token}`, "Content-Type": "application/json" },
      json: true,
      url: `${this.url}/rest/api/2/${path}`,
    }) as T
  }

  private async getApi3<T> (path: string): Promise<T> {
    return await request({
      headers: { Authorization: `Basic ${this.token}`, "Content-Type": "application/json" },
      json: true,
      url: `${this.url}/rest/api/3/${path}`,
    }) as T
  }

  protected converter (issue: RawIssue): ParsedIssue {
    switch (issue.fields.issuetype.name) {
    case "Epic":
      return {
        description: issue.fields.description,
        epicName: issue.fields.customfield_11121 || null,
        issuetype: { name: issue.fields.issuetype.name as "Epic", iconUrl: issue.fields.issuetype.iconUrl },
        key: issue.key,
        summary: issue.fields.summary,
        webUrl: `${this.url}/browse/${issue.key}`,
      }
    case "Story":
      return {
        description: issue.fields.description,
        epicKey: issue.fields.customfield_11120,
        issuetype: { name: issue.fields.issuetype.name as "Story", iconUrl: issue.fields.issuetype.iconUrl },
        key: issue.key,
        summary: issue.fields.summary,
        webUrl: `${this.url}/browse/${issue.key}`,
      }
    default:
      throw new Error(`Unknown issue type: ${issue.fields.issuetype.name}`)
    }
  }
}

export class MockedParsedJiraBasicAuth extends ParsedJiraBasicAuth {

  async getIssue (key: string): Promise<ParsedIssue> {
    const issue = readJson<RawIssue>(join("issue", key, "200.json"))
    return this.converter(issue)
  }

  async getSchema (key: string): Promise<void> {
    readJson<RawIssueMetadata>(join("issue", key, "metadata", "200.json"))
  }
}
