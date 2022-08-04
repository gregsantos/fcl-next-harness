import * as fcl from "@onflow/fcl"
import { yup, nope } from "../util"

export const LABEL = "Serialize"
export const CMD = async () => {
  const voucher = await fcl
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
    .then(yup("US-1"))
    .catch(nope("US-1"))
}
