import * as fcl from "@onflow/fcl"
import getConfig from "next/config"

const USE_LOCAL = true
const resolver = async () => ({
  appIdentifier: "Awesome App (v0.0)",
  nonce: "3037366134636339643564623330316636626239323161663465346131393662",
})
const { publicRuntimeConfig } = getConfig()

const FCL_CRYPTO_CONTRACT_ADDR =
  process.env.NEXT_PUBLIC_FCL_CRYPTO_CONTRACT ||
  publicRuntimeConfig.fclCryptoContract

const isServerSide = () => typeof window === "undefined"
const LOCAL_STORAGE = {
  can: !isServerSide(),
  get: async key => JSON.parse(localStorage.getItem(key)),
  put: async (key, value) => localStorage.setItem(key, JSON.stringify(value)),
}

// prettier-ignore
fcl
  .config()
  .put("app.detail.title", "Test Harness")
  .put("app.detail.icon", "https://placekitten.com/g/200/200")
  .put("service.OpenID.scopes", "email") 
  .put("fcl.accountProof.resolver", resolver)
//.put("fcl.storage", LOCAL_STORAGE)
//.put("discovery.wallet.method", "POP/RPC")

if (USE_LOCAL) {
  // prettier-ignore
  fcl
    .config()
    .put("debug.accounts", true)
    .put("logger.level", 2)
    .put("flow.network", "local")
    .put("accessNode.api", "http://localhost:8888")
    .put("discovery.wallet", "http://localhost:8701/fcl/authn")
} else {
  // prettier-ignore
  fcl
    .config()
    .put("logger.level", 2)
  // testnet
    .put("flow.network", "testnet")
    .put("accessNode.api", "https://rest-testnet.onflow.org")
  // grpc: https://access-testnet.onflow.org
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
  // mainnet
  // .put("flow.network", "mainnet")
  // .put("accessNode.api", "https://rest-mainnet.onflow.org")
  // .put("discovery.wallet", "https://fcl-discovery.onflow.org/authn")
  // Discovery API
  // .put("discovery.authn.include", ["0x9d2e44203cb13051"])
  // .put("discovery.authn.endpoint", "https://fcl-discovery.onflow.org/api/testnet/authn")
  // Dapper Wallet
  // .put("discovery.wallet","https://staging.accounts.meetdapper.com/fcl/authn-restricted")
  // .put("discovery.wallet.method", "POP/RPC")
  // .put("discovery.wallet","https://graphql-api.staging.app.dapperlabs.com/fcl/authn")
  // .put("discovery.wallet.method", "HTTP/POST")
  // .put("discovery.wallet","https://graphql-api.app.dapperlabs.com/fcl/authn")
}
