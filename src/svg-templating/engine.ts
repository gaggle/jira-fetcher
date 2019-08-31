import { Context, Emitter, Hash, ITemplate, Liquid, TagToken, Token } from "liquidjs"

import { parseEqualDelimitedString } from "../utils"

export const engine = new Liquid({
  root: `${__dirname}`,
  extname: ".liquid"
})

engine.registerTag("textarea", {
  parse: function (token: TagToken, remainingTokens: Token[]) {
    this.args = parseEqualDelimitedString(token.args)
    this.col = token.col

    const stream = engine.parser.parseStream(remainingTokens)
    this.templates = [] as ITemplate[]
    stream
      .on("template", tpl => this.templates.push(tpl))
      .on("tag:endtextarea", () => stream.stop())
      .on("end", () => {throw new Error(`tag ${token.raw} not closed`)})
    stream.start()
  },

  render: async function (ctx: Context, _hash: Hash, emitter: Emitter) {
    const output = ctx.sync
      ? this.liquid.renderer.renderTemplatesSync(this.templates, ctx)
      : await this.liquid.renderer.renderTemplates(this.templates, ctx)

    const indent = " ".repeat(this.col - 1 + 2)
    const x = Number.parseInt(this.args.x)
    const y = Number.parseInt(this.args.y)

    const svgContent = splitter(output).map(el => {
      if (!el.text.trim()) return undefined
      return `\n${indent}<tspan x="${x + el.x}" y="${y + el.y}">${el.text}</tspan>`
    }).join(`\n${indent}`)

    emitter.write(`<text x="${this.args.x}" y="${this.args.y}">${svgContent}</text>`)
  }
})

interface TextElement {
  x: number;
  y: number;
  text: string;
}

function splitter (text: string): TextElement[] {
  function split (text: string, index: number, opts?: { x: number; y: number; fontSize: number; lineHeight: number }): TextElement {
    opts = { ...{ x: 0, y: 0, fontSize: 14, lineHeight: 1.25 }, ...opts }
    const y = index * opts.fontSize * opts.lineHeight
    return { x: opts.x, y: y, text: text }
  }

  return text.split("\n").map((value, index) => split(value, index))
}
