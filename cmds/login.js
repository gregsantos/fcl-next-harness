import * as fcl from "@onflow/fcl"
import { yup, nope, serviceOfType } from "../util"
import { success, fail } from "../util"

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
      (await fcl.config.first(["env", "flow.network"])) === "local"
        ? process.env.NEXT_PUBLIC_FCL_CRYPTO_CONTRACT
        : null

    const verified = await fcl.AppUtils.verifyAccountProof(
      "Awesome App (v0.0)",
      accountProofService.data,
      { fclCryptoContract }
    )
    console.log("verified client:", verified)

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountProofService.data),
    })
    console.log("verified server:", await res.json())
  }

  return success(LABEL)(res)
}
