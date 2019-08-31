import { strictEqual } from "assert"

import { renderMarkdown } from "."

describe("renderMarkdown", () => {
  it("returns html string", (): void => {
    strictEqual(renderMarkdown("*oh yes*"), "<p><em>oh yes</em></p>\n")
  })
})
