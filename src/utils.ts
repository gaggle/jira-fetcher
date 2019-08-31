import { promises as fs } from "fs"

type StringDict = { [key: string]: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function writeFile (path: string, data: any): Promise<void> {
  await fs.writeFile(path, data)
}

export function parseEqualDelimitedString (str: string): StringDict {
  return keyByTuplePairs(str.split(" ").map(g => {
    const [key, value] = g.split("=", 2)
    const strippedValue = value.replace(/"/g, "")
    return [key, strippedValue]
  }))
}

function keyByTuplePairs (array: [string, string][]): StringDict {
  const result: StringDict = {}

  array.forEach(([key, value]) => {
    result[key] = value
  })

  return result
}
