#!/usr/bin/env node
import { join } from "path"
import { readFileSync } from "fs"

import program from "commander"

import { MockedRawJiraBasicAuth, RawJiraBasicAuth } from "./RawJiraBasicAuth"
import { RawIssueMetadata } from "./types/RawIssueMetadata"
import { SimpleJiraClient } from "./types"
import { ParsedIssue } from "./types/ParsedIssue"
import { RawIssue } from "./types/RawIssue"
import { IssueArgs } from "./types/args"
import { MockedParsedJiraBasicAuth, ParsedJiraBasicAuth } from "./ParsedJiraBasicAuth"

const packageInfo = JSON.parse(readFileSync(join(__dirname, "..", "package.json")).toString())

export async function printParsedIssue (simpleJiraClient: SimpleJiraClient<ParsedIssue, void>, key: string): Promise<void> {
  const issue = await simpleJiraClient.getIssue(key)
  console.log(JSON.stringify(issue, undefined, 2))
}

export async function printRawIssue (simpleJiraClient: SimpleJiraClient<RawIssue, RawIssueMetadata>, key: string): Promise<void> {
  const issue = await simpleJiraClient.getIssue(key)
  console.log(JSON.stringify(issue, undefined, 2))
}

program
  .version(packageInfo.version)
  .on("command:*", () => exit("Invalid command, see help for a list of available commands", 1))
  .on("--help", () => {
    console.log("\nExamples:\n  $ simplejira raw-issue FOO-123\n  $ simplejira simple-issue FOO-123")
  })

program
  .option("-s --server <url>", "Jira server (env: JIRA_SERVER)", process.env.JIRA_SERVER)
  .option("-u --user <user>", "Jira user (env: JIRA_USER)", process.env.JIRA_USER)
  .option("-t --token <token>", "Jira token (env: JIRA_TOKEN)", process.env.JIRA_TOKEN)
  .option("--debug-use-mock-jira", "If enabled, use a mock Jira gateway to return precanned data (used for testing)", false)

program
  .command("raw-issue <issue>", {})
  .description("print the specified issue directly as received from server")
  .action(async (issue, args: IssueArgs) => {
    const rootArgs = args.parent
    validateCredentialsOrExit(rootArgs)
    const clientClass = rootArgs.debugUseMockJira ? MockedRawJiraBasicAuth : RawJiraBasicAuth
    const simpleJiraClient = new clientClass(rootArgs.server, {
      user: rootArgs.user,
      token: rootArgs.token
    })
    await printRawIssue(simpleJiraClient, issue).catch(errorHandler)
  })

program
  .command("simple-issue <issue>", {})
  .description("print the specified issue parsed into a simplified format")
  .action(async (issue, args: IssueArgs) => {
    const rootArgs = args.parent
    validateCredentialsOrExit(rootArgs)
    const clientClass = rootArgs.debugUseMockJira ? MockedParsedJiraBasicAuth : ParsedJiraBasicAuth
    const simpleJiraClient = new clientClass(rootArgs.server, {
      user: rootArgs.user,
      token: rootArgs.token
    })
    await printParsedIssue(simpleJiraClient, issue).catch(errorHandler)
  })

program.parse(process.argv)

if (!program.args.length) {
  // No command specified
  program.help()
}

// eslint-disable-next-line
function errorHandler (err: any) {
  exit(`Error: ${err}`, 1)
}

function exit (reason: string, code?: number): void {
  code = code || 0
  console.error(reason)
  process.exit(code)
}

function validateCredentialsOrExit (args: { server: string; token: string; user: string }) {
  if (args.server || args.user || args.token) return

  const missing: string[] = []
  if (!args.server) missing.push("--server")
  if (!args.user) missing.push("--user")
  if (!args.token) missing.push("--token")
  exit(`Missing required options: ${missing.join(", ")}`)
}
