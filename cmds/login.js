import * as fcl from "@onflow/fcl"
import {config} from "@onflow/config"
import {yup, nope, serviceOfType} from "../util"

export const LABEL = "Log In"
export const CMD = async () => {
  // prettier-ignore
  let res = await fcl
    .reauthenticate()
    .then(yup("US-1"))
    .then(res => res)
    .catch(nope("US-1"))

  const accountProofService = serviceOfType(res.services, "account-proof")
  if (accountProofService) {
    const fclCryptoContract =
      (await config.first(["env", "local"])) === "local"
        ? await config.get("0xFCLCryptoContract")
        : null

    const verified = await fcl.AppUtils.verifyAccountProof(
      "Awesome App (v0.0)",
      accountProofService.data,
      {fclCryptoContract}
    )

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountProofService.data),
    })
    console.log(await res.json())
  }
  return res
}
