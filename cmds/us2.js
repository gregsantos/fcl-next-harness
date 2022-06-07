import * as fcl from "@onflow/fcl"
import {Buffer} from "buffer"

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
    }).then(console.log)
  } catch (error) {
    console.log(error)
  }
}
