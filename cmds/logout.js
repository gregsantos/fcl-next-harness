import { unauthenticate } from "@onflow/fcl"
import { success, fail } from "../util"

export const LABEL = "Log Out"
export const CMD = () => {
  try {
    unauthenticate()
    return success(LABEL)
  } catch (e) {
    return fail(LABEL)
  }
}
