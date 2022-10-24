export const yup = tag => d => (console.log(`${tag}`, d), d)
export const nope = tag => d => (console.error(`Oh No!! [${tag}]`, d), d)
export function serviceOfType(services = [], type) {
  return services.find(service => service.type === type)
}

export const success = tag => data => (
  console.log(`${tag}`, data), `success - ${tag}`
)
export const fail = tag => data => (
  console.error(`Oh No!! [${tag}]`, data), `fail - ${tag}`
)
