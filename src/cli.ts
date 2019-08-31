#!/usr/bin/env node
import { join } from "path"
import { readFileSync } from "fs"

import program from "commander"

import { JiraGateway } from "./jira"

import { processSingleIssue } from "."

const packageInfo = JSON.parse(readFileSync(join(__dirname, "..", "package.json")).toString())

program
  .version(packageInfo.version)

program
  .command("issue <issue>", {})
  .description("print the specified issue")
  .action(async issue => {
    const jiraGateway = new JiraGateway("http://jira", "jln@siteimprove.com", "foobar")
    await processSingleIssue(jiraGateway, issue, "./issue.svg")
  })
  .on("--help", () => {
    console.log("")
    console.log("Examples:")
    console.log("  $ jiraprint issue FOO-123")
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  // No command was specified
  program.outputHelp(() => program.help())
}
