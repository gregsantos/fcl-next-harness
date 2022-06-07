import * as fcl from "@onflow/fcl"

const APP_IDENTIFIER = "Awesome App (v0.0)"
export default async function handler(req, res) {
  const body = req.body

  const fclCryptoContract =
    (await fcl.config.first(["env", "flow.network"])) === "local"
      ? process.env.FCL_CRYPTO_CONTRACT
      : null

  if (req.method !== "POST") {
    res.status(405).send({message: "Only POST requests allowed"})
    return
  }

  const verified = await fcl.AppUtils.verifyAccountProof(APP_IDENTIFIER, body, {
    fclCryptoContract,
  })

  res.status(200).json(verified)
}
