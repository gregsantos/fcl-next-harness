import * as fcl from "@onflow/fcl"
import {config} from "@onflow/config"

const APP_IDENTIFIER = "Awesome App (v0.0)"
export default async function handler(req, res) {
  const body = req.body

  const fclCryptoContract =
    (await config.first(["env", "network"])) === "local"
      ? await config.get("0xFCLCryptoContract")
      : null

  if (req.method !== "POST") {
    res.status(405).send({message: "Only POST requests allowed"})
    return
  }

  const verified = await fcl.AppUtils.verifyAccountProof(APP_IDENTIFIER, body, {
    fclCryptoContract,
  })

  res.status(200).json({verifiedAccount: verified})
}
