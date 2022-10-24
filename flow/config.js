import * as fcl from "@onflow/fcl"

const USE_LOCAL = false
const resolver = async () => ({
  appIdentifier: "Awesome App (v0.0)",
  nonce: "3037366134636339643564623330316636626239323161663465346131393662",
})

const isServerSide = () => typeof window === "undefined"
const LOCAL_STORAGE = {
  can: !isServerSide(),
  get: async key => JSON.parse(localStorage.getItem(key)),
  put: async (key, value) => localStorage.setItem(key, JSON.stringify(value)),
}

// prettier-ignore
fcl
  .config()
  .put("debug.accounts", true)
  .put("logger.level", 2)
  .put("app.detail.title", "Test Harness")
  .put("app.detail.icon", "https://placekitten.com/g/200/200")
  .put("service.OpenID.scopes", "email")
  .put("fcl.accountProof.resolver", resolver)
// storage override
//.put("fcl.storage", LOCAL_STORAGE)

if (USE_LOCAL) {
  // prettier-ignore
  fcl
    .config()
    .put("flow.network", "local")
    .put("accessNode.api", "http://localhost:8888")
    // dev-wallet
    .put("discovery.wallet", "http://localhost:8701/fcl/authn")
  // local discovery
  // .put("discovery.wallet", "http://localhost:3002/local/authn")
  // .put("discovery.authn.endpoint", "http://localhost:3002/api/local/authn")
} else {
  // prettier-ignore
  fcl
    .config()
    // testnet
    .put("flow.network", "testnet")
    .put("accessNode.api", "https://rest-testnet.onflow.org") // grpc: https://access-testnet.onflow.org
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
    .put(
      "discovery.authn.endpoint",
      "https://fcl-discovery.onflow.org/api/testnet/authn"
    )
    .put("discovery.authn.include", [
      "0x82ec283f88a62e65",  // Dapper
      "0x9d2e44203cb13051",  // Ledger
    ])
  // mainnet
  // .put("flow.network", "mainnet")
  // .put("accessNode.api", "https://rest-mainnet.onflow.org")
  // .put("discovery.wallet", "https://fcl-discovery.onflow.org/authn")
  // .put("discovery.authn.endpoint","https://fcl-discovery.onflow.org/api/mainnet/authn")
  // .put("discovery.authn.include", ["0xead892083b3e2c6c", "0xe5cd26afebe62781",])
  // Dapper Wallet
  // .put("discovery.wallet","https://staging.accounts.meetdapper.com/fcl/authn-restricted")
  // .put("discovery.wallet.method", "POP/RPC")
  // .put("discovery.wallet","https://graphql-api.staging.app.dapperlabs.com/fcl/authn")
  // .put("discovery.wallet.method", "HTTP/POST")
  // .put("discovery.wallet","https://graphql-api.app.dapperlabs.com/fcl/authn")
}
