import * as fcl from "@onflow/fcl"
import {Buffer} from "buffer"
import {config} from "@onflow/config"

const toHexStr = str => {
  return Buffer.from(str).toString("hex")
}

export const LABEL = "User Sign & Verify"
export const CMD = async () => {
  const MSG = toHexStr("FOO")
  const fclCryptoContract =
    (await config.first(["env", "local"])) === "local"
      ? await config.get("0xFCLCryptoContract")
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
