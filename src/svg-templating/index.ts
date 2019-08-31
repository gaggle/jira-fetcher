import { engine } from "./engine"

interface IssueData {
  epicKey: string;
  issueDescr: string;
  issueKey: string;
  issueTitle: string;
}

interface TemplateMap {
  issue: IssueData;
}

type Template = keyof TemplateMap

const templatePathMap: Readonly<{ [T in Template]: string }> = {
  issue: "issue.liquid",
}

export async function render<T extends Template> (template: T, data: TemplateMap[T]): Promise<string> {
  return await engine.renderFile(templatePathMap[template], data)
    .then(stripEmptyLines)
}

function stripEmptyLines (text: string): string {
  return text.replace(/(^[ \t]*\n)/gm, "")
}
