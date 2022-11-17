import { query } from "@onflow/fcl"
import { success, fail } from "../util"

export const LABEL = "Query 1 (no args)"
export const CMD = async () => {
  // prettier-ignore
  query({
    cadence: `
      pub fun main(): Int {
        return 7
      }
    `,
  }).then(success(LABEL))
  .catch(fail(LABEL))
}
