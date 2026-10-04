import ipaddr from 'ipaddr.js'
import { createHmac } from 'node:crypto'

const IPV6_NETWORK_GROUPS = 4

// One IPv6 host usually gets a whole /64 to pick addresses from, so the rate limit keys on the network.
function rateLimitKey(ip: string) {
  if (!ipaddr.isValid(ip)) return ip

  const address = ipaddr.process(ip)

  return address instanceof ipaddr.IPv6
    ? address.parts.slice(0, IPV6_NETWORK_GROUPS).join(':')
    : address.toString()
}

export function hashIp(ip: string, secret: string): string {
  return createHmac('sha256', secret).update(rateLimitKey(ip)).digest('hex')
}
