import * as fcl from "@onflow/fcl"
import { useState, useEffect, useRef } from "react"
import "../flow/config"
import { COMMANDS } from "../cmds"
import useCurrentUser from "../hooks/use-current-user"
import useConfig from "../hooks/use-config"

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
      <pre>Status: {status}</pre>
      <div>
        {services?.map(service => (
          <button
            key={service.provider.address}
            onClick={() => fcl.authenticate({ service })}
          >
            Login with {service.provider.name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "12px" }}>
        <label for="manual-wallet">
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
