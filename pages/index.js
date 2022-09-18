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
        includeBaseWC: true,
        wallets: [],
        sessionRequestHook: data => {
          console.log("WC Request data", data)
        },
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
          <>
            <img src={service.provider.icon} style={{width: '50px', height: '50px'}} />
            <button
              key={service.provider.address}
              onClick={() => fcl.authenticate({ service })}
            >
              Login with {service.provider.name}
            </button>
          </>
        ))}
      </div>
      <pre>{JSON.stringify({ currentUser, config }, null, 2)}</pre>
    </div>
  )
}
