#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const commander_1 = __importDefault(require("commander"));
const RawJiraBasicAuth_1 = require("./RawJiraBasicAuth");
const ParsedJiraBasicAuth_1 = require("./ParsedJiraBasicAuth");
const packageInfo = JSON.parse(fs_1.readFileSync(path_1.join(__dirname, "..", "package.json")).toString());
async function printParsedIssue(simpleJiraClient, key) {
    const issue = await simpleJiraClient.getIssue(key);
    console.log(JSON.stringify(issue, undefined, 2));
}
exports.printParsedIssue = printParsedIssue;
async function printRawIssue(simpleJiraClient, key) {
    const issue = await simpleJiraClient.getIssue(key);
    console.log(JSON.stringify(issue, undefined, 2));
}
exports.printRawIssue = printRawIssue;
commander_1.default
    .version(packageInfo.version)
    .on("command:*", () => exit("Invalid command, see help for a list of available commands", 1))
    .on("--help", () => {
    console.log("\nExamples:\n  $ simplejira raw-issue FOO-123\n  $ simplejira simple-issue FOO-123");
});
commander_1.default
    .option("-s --server <url>", "Jira server (env: JIRA_SERVER)", process.env.JIRA_SERVER)
    .option("-u --user <user>", "Jira user (env: JIRA_USER)", process.env.JIRA_USER)
    .option("-t --token <token>", "Jira token (env: JIRA_TOKEN)", process.env.JIRA_TOKEN)
    .option("--debug-use-mock-jira", "If enabled, use a mock Jira gateway to return precanned data (used for testing)", false);
commander_1.default
    .command("raw-issue <issue>", {})
    .description("print the specified issue directly as received from server")
    .action(async (issue, args) => {
    const rootArgs = args.parent;
    validateCredentialsOrExit(rootArgs);
    const clientClass = rootArgs.debugUseMockJira ? RawJiraBasicAuth_1.MockedRawJiraBasicAuth : RawJiraBasicAuth_1.RawJiraBasicAuth;
    const simpleJiraClient = new clientClass(rootArgs.server, {
        user: rootArgs.user,
        token: rootArgs.token
    });
    await printRawIssue(simpleJiraClient, issue).catch(errorHandler);
});
commander_1.default
    .command("simple-issue <issue>", {})
    .description("print the specified issue parsed into a simplified format")
    .action(async (issue, args) => {
    const rootArgs = args.parent;
    validateCredentialsOrExit(rootArgs);
    const clientClass = rootArgs.debugUseMockJira ? ParsedJiraBasicAuth_1.MockedParsedJiraBasicAuth : ParsedJiraBasicAuth_1.ParsedJiraBasicAuth;
    const simpleJiraClient = new clientClass(rootArgs.server, {
        user: rootArgs.user,
        token: rootArgs.token
    });
    await printParsedIssue(simpleJiraClient, issue).catch(errorHandler);
});
commander_1.default.parse(process.argv);
if (!commander_1.default.args.length) {
    // No command specified
    commander_1.default.help();
}
// eslint-disable-next-line
function errorHandler(err) {
    exit(`Error: ${err}`, 1);
}
function exit(reason, code) {
    code = code || 0;
    console.error(reason);
    process.exit(code);
}
function validateCredentialsOrExit(args) {
    if (args.server || args.user || args.token)
        return;
    const missing = [];
    if (!args.server)
        missing.push("--server");
    if (!args.user)
        missing.push("--user");
    if (!args.token)
        missing.push("--token");
    exit(`Missing required options: ${missing.join(", ")}`);
}
//# sourceMappingURL=cli.js.map