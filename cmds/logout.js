import { unauthenticate } from "@onflow/fcl"
import { success, fail } from "../util"

export const LABEL = "Log Out"
export const CMD = () => {
  try {
    unauthenticate()
    return success(LABEL)(null)
  } catch (e) {
    return fail(LABEL)(e)
  }
}
