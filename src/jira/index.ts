import { join } from "path"
import { readFileSync } from "fs"

const fixturePath = join(__dirname, "..", "..", "test", "fixtures")
const jiraPath = join(fixturePath, "jira", "rest", "api", "2")

export interface JiraIssue {
  key: string;
  description: string;
  summary: string;
  epicKey: string;
}

export class JiraGateway {
  private url: string
  private user: string
  private token: string

  constructor (url: string, user: string, token: string) {
    this.url = url
    this.user = user
    this.token = token
  }

  async getIssue (key: string): Promise<JiraIssue> {
    const issue: RawJiraIssue = JSON.parse(readFileSync(join(jiraPath, "issue", `200.${key}.json`)).toString())
    return {
      key: issue.key,
      description: issue.fields.description,
      summary: issue.fields.summary,
      epicKey: issue.fields.customfield_11120,
    }
  }
}

interface RawJiraIssue {
  key: string;
  fields: {
    description: string;
    summary: string;
    customfield_11120: string;
  };
}
