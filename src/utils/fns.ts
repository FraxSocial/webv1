import { PublicClient } from 'wagmi'

// Simulated FNS name registry for development
const registeredNames = new Set(['sam', 'alice', 'bob'])

export async function validateFNSName(name: string): Promise<boolean> {
  if (!name) return false

  // Name format validation (alphanumeric and hyphens only, 3-32 characters)
  const validNameRegex = /^[a-zA-Z0-9-]{3,32}$/
  const isValidFormat = validNameRegex.test(name)
  
  // For development, consider all properly formatted names as valid
  // In production, this would check the actual FNS contract
  return isValidFormat
}

export async function resolveFNSName(name: string, publicClient: PublicClient): Promise<string | null> {
  try {
    // For development, simulate name resolution
    // In production, this would query the FNS contract
    if (await validateFNSName(name)) {
      return `${name}.frax`
    }
    return null
  } catch (error) {
    console.error('Error resolving FNS name:', error)
    return null
  }
}

export async function getReverseFNSName(address: string, publicClient: PublicClient): Promise<string | null> {
  // For development, return null
  // In production, this would query the FNS contract for reverse records
  return null
}
