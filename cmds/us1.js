import { currentUser } from "@onflow/fcl"
import { Buffer } from "buffer"
import { success, fail } from "../util"

export const LABEL = "User Sign 1 (No Verification)"
export const CMD = async () => {
  const MSG = "FOO"
  return currentUser()
    .signUserMessage(Buffer.from(MSG).toString("hex"))
    .then(success(LABEL))
    .catch(fail(LABEL))
}
