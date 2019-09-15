import { readFileSync } from "fs"
import { join, sep } from "path"

import { parse as treeParse } from "dree"

const fixturePath = join(__dirname, "..", "..", "test", "fixtures", "jira")
const api2Path = join("rest", "api", "2")

export function readJson<T> (path: string): T {
  const basePath = join(fixturePath, api2Path)

  let fixtureBuffer: Buffer
  try {
    fixtureBuffer = readFileSync(join(basePath, path))
  } catch (err) {
    const splitted = path.split(sep)
    const pathRoot = splitted[0]
    const pathMinusLast = join(...splitted.slice(0, splitted.length - 1))
    const tree = treeParse(join(basePath, pathRoot), { depth: 1 })
    throw `No fixture for '${pathMinusLast}', available fixtures:\n${tree}`
  }
  return JSON.parse(fixtureBuffer.toString()) as T
}
