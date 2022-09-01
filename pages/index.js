import * as fcl from "@onflow/fcl"
import useCurrentUser from "../hooks/use-current-user"
import useConfig from "../hooks/use-config"
import { useState, useEffect } from "react"
import { COMMANDS } from "../cmds"
import { init } from "@onflow/fcl-wc"
import "../flow/config"

const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID
const WC_METADATA = {
  name: "FCL WalletConnect",
  description: "FCL DApp for WalletConnect",
  url: "https://flow.com/",
  icons: ["https://avatars.githubusercontent.com/u/62387156?s=280&v=4"],
}
const lilicoMobileWallet = {
  f_type: "Service",
  f_vsn: "1.0.0",
  type: "authn",
  method: "WC/RPC",
  uid: "https://lilico.app",
  endpoint: "flow_authn",
  provider: {
    address: "0x9a4a5f2e7de57741",
    name: "Lilico Mobile",
    icon: "/images/lilico.png",
    description:
      "A Mobile crypto wallet on Flow built for explorers, collectors, and gamers.",
    color: "#FC814A",
    supportEmail: "hi@lilico.app",
    website: "https://link.lilico.app/wc",
  },
}

const fclReactWallet = {
  f_type: "Service",
  f_vsn: "1.0.0",
  type: "authn",
  method: "WC/RPC",
  uid: "https://flow-walletconnect-v2-react-wallet.vercel.app",
  endpoint: "flow_authn",
  provider: {
    address: "0x12345678",
    name: "FCL/WC React Wallet",
    icon: "https://avatars.githubusercontent.com/u/37784886",
    description: "React Wallet for FCL WalletConnect",
    color: "#FC814A",
    supportEmail: "",
    website: "https://flow-walletconnect-v2-react-wallet.vercel.app",
  },
}

const renderCommand = d => {
  return (
    <li key={d.LABEL}>
      <button onClick={d.CMD}>{d.LABEL}</button>
    </li>
  )
}

export default function Home() {
  const currentUser = useCurrentUser()
  const config = useConfig()
  const [services, setServices] = useState([])

  useEffect(() => {
    const initAdapter = async () => {
      const { FclWcServicePlugin, client } = await init({
        projectId: WC_PROJECT_ID,
        metadata: WC_METADATA,
        // includeBaseWC: true,
        /*wallets: [lilicoMobileWallet, fclReactWallet],
        sessionRequestHook: data => {
          console.log(`Approve Session in your ${data.name} Mobile Wallet.`)
        }, 
        */
      })
      fcl.pluginRegistry.add(FclWcServicePlugin)
    }
    initAdapter()
  }, [])

  useEffect(() => {
    const fetchServices = async () =>
      await fcl.discovery.authn.subscribe(res => {
        console.log("discovery api services", res)
        setServices(res.results)
      })
    fetchServices()
  }, [])

  useEffect(() => {
    require("../decorate")
  }, [])

  return (
    <div>
      <ul>{COMMANDS.map(renderCommand)}</ul>
      <div>
        {services?.map(service => (
          <button
            key={service.uid}
            onClick={() => fcl.authenticate({ service })}
          >
            Login with {service.provider.name}
          </button>
        ))}
      </div>
      <pre>{JSON.stringify({ currentUser, config }, null, 2)}</pre>
    </div>
  )
}
