import { JiraGateway } from "./jira"
import { render } from "./svg-templating"
import { writeFile } from "./utils"

export async function processSingleIssue (jiraGateway: JiraGateway, key: string, outPath: string): Promise<void> {
  console.log("Processing issue:", key)
  const issue = await jiraGateway.getIssue(key)
  const rendered = await render("issue", {
    epicKey: issue.epicKey,
    issueDescr: issue.description,
    issueKey: issue.key,
    issueTitle: issue.summary,
  })
  await writeFile(outPath, rendered)
}
