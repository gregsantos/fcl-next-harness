import { query } from "@onflow/fcl"
import { success, fail } from "../util"

export const LABEL = "Query 2 (args)"
export const CMD = async () => {
  // prettier-ignore
  query({
    cadence: `
      pub fun main(a: Int, b: Int): Int {
        return a + b
      }
    `,
    args: (arg, t) => [
      arg("5", t.Int),
      arg("7", t.Int),
    ],
  }).then(success(LABEL))
  .catch(fail(LABEL))
}
