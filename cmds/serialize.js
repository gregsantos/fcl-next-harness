import * as fcl from "@onflow/fcl"
import { success, fail } from "../util"

export const LABEL = "Serialize"
export const CMD = async () => {
  return await fcl
    .serialize([
      fcl.transaction`
            transaction() {
              prepare(acct: AuthAccount) {
                log(acct)
              }
            }
          `,
      fcl.limit(999),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      fcl.payer(fcl.authz),
    ])
    .then(success(LABEL))
    .catch(fail(LABEL))
}
