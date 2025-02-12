import { PublicClient } from 'wagmi'
import { namehash } from 'viem/ens'

// TODO: Replace with actual FNS contract addresses and ABIs
const FNS_REGISTRY_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
const FNS_RESOLVER_ABI = [
  'function name(bytes32 node) view returns (string)',
  'function addr(bytes32 node) view returns (address)',
] as const

export async function validateFNSName(name: string): Promise<boolean> {
  if (!name) return false
  // Name format validation (alphanumeric and hyphens only)
  const validNameRegex = /^[a-zA-Z0-9-]+$/
  return validNameRegex.test(name)
}

export async function resolveFNSName(name: string, publicClient: PublicClient): Promise<string | null> {
  try {
    // TODO: Replace with actual FNS resolution logic
    // This is a placeholder that mimics ENS resolution
    const fullName = `${name}.frax`
    const node = namehash(fullName)
    const data = await publicClient.readContract({
      address: FNS_REGISTRY_ADDRESS,
      abi: FNS_RESOLVER_ABI,
      functionName: 'addr',
      args: [node],
    })
    return data as string
  } catch (error) {
    console.error('Error resolving FNS name:', error)
    return null
  }
}

export async function getReverseFNSName(address: string, publicClient: PublicClient): Promise<string | null> {
  try {
    // TODO: Replace with actual FNS reverse lookup logic
    // For now, just return null as we'll implement this later
    return null
  } catch (error) {
    console.error('Error getting reverse FNS name:', error)
    return null
  }
}
