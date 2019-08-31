import { HtmlRenderer, Parser } from "commonmark"

const parser = new Parser()
const renderer = new HtmlRenderer()

export function renderMarkdown (md: string): string {
  return renderer.render(parser.parse(md))
}
