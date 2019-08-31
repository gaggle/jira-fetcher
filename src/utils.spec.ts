import { strictEqual } from "assert"

import { parseEqualDelimitedString } from "./utils"

describe("parseEqualDelimitedString", () => {
  it("converts string of 'equal-delimited' key-values to array of tuple-pairs", () => {
    const res = parseEqualDelimitedString("ham=\"spam\" foo=\"bar\"")
    strictEqual(JSON.stringify(res), JSON.stringify({ ham: "spam", foo: "bar" }))
  })
})
