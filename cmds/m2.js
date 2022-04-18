import {mutate} from "@onflow/fcl"
import {yup, nope} from "../util"

export const LABEL = "Mutate 2 (args)"
export const CMD = async () => {
  // prettier-ignore
  return mutate({
    cadence: `
      transaction(a: String, b: String, c: Address) {
        prepare(acct: AuthAccount) {
          log(acct)
          log(a)
          log(b)
          log(c)
        }
      }
    `,
    args: (arg, t) => [
      arg("6", t.String),
      arg("7", t.String),
      arg("0xba1132bc08f82fe2", t.Address),
    ],
    limit: 50,
  })
    .then(yup("M-1"))
    .catch(nope("M-1"))
}
