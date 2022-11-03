import { mutate } from "@onflow/fcl"
import { success, fail } from "../util"

export const LABEL = "Mutate 1 (no args)"
export const CMD = async () => {
  // prettier-ignore
  return mutate({
    cadence: `
      transaction() {
        prepare(acct: AuthAccount) {
          log(acct)
        }
      }
    `,
    limit: 50,
  }).then(success(LABEL))
    .catch(fail(LABEL))
}
