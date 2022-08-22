import * as fcl from "@onflow/fcl"
import { useState, useEffect } from "react"
import "../flow/config"
import { COMMANDS } from "../cmds"
import useCurrentUser from "../hooks/use-current-user"
import useConfig from "../hooks/use-config"

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
  const [network, setNetwork] = useState("")

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

  useEffect(() => {
    const getNetwork = async () => {
      setNetwork(await fcl.config.first(["flow.network.default"]))
    }
    getNetwork()
  }, [config])

  return (
    <div>
      <h1>Network: {network}</h1>
      <ul>{COMMANDS.map(renderCommand)}</ul>
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
      <pre>{JSON.stringify({ currentUser, config }, null, 2)}</pre>
    </div>
  )
}
