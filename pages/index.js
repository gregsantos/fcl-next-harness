import * as fcl from "@onflow/fcl"
import { useState, useEffect, useRef } from "react"
import "../flow/config"
import { COMMANDS } from "../cmds"
import useCurrentUser from "../hooks/use-current-user"
import useConfig from "../hooks/use-config"
import { useState, useEffect } from "react"
import { COMMANDS } from "../cmds"
import { init } from "@onflow/fcl-wc"
import Image from "next/image"
import "../flow/config"

const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID
const WC_METADATA = {
  name: "FCL WalletConnect",
  description: "FCL DApp for WalletConnect",
  url: "https://flow.com/",
  icons: ["https://avatars.githubusercontent.com/u/62387156?s=280&v=4"],
}

const renderCommand = (d, setStatus) => {
  return (
    <li key={d.LABEL}>
      <button
        onClick={async () => {
          setStatus("pending...")
          setStatus(await d.CMD())
        }}
      >
        {d.LABEL}
      </button>
    </li>
  )
}

export default function Home() {
  const currentUser = useCurrentUser()
  const config = useConfig()
  const [services, setServices] = useState([])
  const discoveryWalletInputRef = useRef(null)
  const [status, setStatus] = useState(null)

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
      <ul>{COMMANDS.map(cmd => renderCommand(cmd, setStatus))}</ul>
      <pre>Status: {status ?? ""}</pre>
      <div>
        {services?.map(service => (
          <span key={service.provider.address}>
            <Image
              src={service.provider.icon}
              alt="Wallet Icon"
              width={25}
              height={25}
            />
            <button onClick={() => fcl.authenticate({ service })}>
              Login with {service.provider.name}
            </button>
          </span>
        ))}
      </div>
      <div style={{ marginTop: "12px" }}>
        <label htmlFor="manual-wallet">
          Manually set "discovery.wallet" config:{" "}
        </label>
        <input ref={discoveryWalletInputRef} name="manual-wallet"></input>
        <button
          onClick={async () =>
            await fcl
              .config()
              .put("discovery.wallet", discoveryWalletInputRef?.current?.value)
          }
        >
          Set
        </button>
      </div>
      <pre>{JSON.stringify({ currentUser, config }, null, 2)}</pre>
    </div>
  )
}
