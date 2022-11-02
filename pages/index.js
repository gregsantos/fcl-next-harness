import * as fcl from "@onflow/fcl"
import useCurrentUser from "../hooks/use-current-user"
import useConfig from "../hooks/use-config"
import { useState, useEffect } from "react"
import { COMMANDS } from "../cmds"
import { init } from "@onflow/fcl-wc"
import Loading from "./loading";
import Image from "next/image"
import "../flow/config"

const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID
const WC_METADATA = {
  name: "FCL WalletConnect",
  description: "FCL DApp for WalletConnect",
  url: "https://flow.com/",
  icons: ["https://avatars.githubusercontent.com/u/62387156?s=280&v=4"],
}

export default function Home() {
  const currentUser = useCurrentUser()
  const config = useConfig()
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const renderCommand = (d) => {
    return (
      <li key={d.LABEL}>
        <button onClick={() => clickHandler(d)}>{d.LABEL}</button>
      </li>
    );
  };

  async function clickHandler(d) {
    setIsLoading(true);
    await d.CMD();
    setIsLoading(false);
  }

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
      <pre>{JSON.stringify({ currentUser, config }, null, 2)}</pre>
      {isLoading ? <Loading/> : null}
    </div>
  )
}
