import * as fcl from "@onflow/fcl"
import { Buffer } from "buffer"
import { success, fail } from "../util"

const toHexStr = str => {
  return Buffer.from(str).toString("hex")
}

export const LABEL = "User Sign & Verify"
export const CMD = async () => {
  const MSG = toHexStr("FOO")
  const fclCryptoContract =
    (await fcl.config.first(["env", "flow.network"])) === "local"
      ? process.env.NEXT_PUBLIC_FCL_CRYPTO_CONTRACT
      : null

  try {
    const res = await fcl.currentUser().signUserMessage(MSG)

    return fcl.AppUtils.verifyUserSignatures(MSG, res, {
      fclCryptoContract,
    })
      .then(success(LABEL))
      .catch(fail(LABEL))
  } catch (error) {
    console.log(error)
    return fail(LABEL)(error)
  }
}
