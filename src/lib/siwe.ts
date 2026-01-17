/**
 * Sign-In With Ethereum (SIWE) utilities
 */

import { verifyMessage } from 'viem';

export interface SiweMessage {
  domain: string;
  address: string;
  statement: string;
  uri: string;
  version: string;
  chainId: number;
  nonce: string;
  issuedAt: string;
  expirationTime?: string;
  resources?: string[];
}

export function createSiweMessage(params: {
  address: string;
  chainId: number;
  nonce: string;
  statement?: string;
  expirationMinutes?: number;
  resources?: string[];
}): SiweMessage {
  const now = new Date();
  const expirationTime = params.expirationMinutes 
    ? new Date(now.getTime() + params.expirationMinutes * 60 * 1000)
    : undefined;

  return {
    domain: window.location.host,
    address: params.address,
    statement: params.statement || 'Sign this message to authenticate with INTENT.',
    uri: window.location.origin,
    version: '1',
    chainId: params.chainId,
    nonce: params.nonce,
    issuedAt: now.toISOString(),
    expirationTime: expirationTime?.toISOString(),
    resources: params.resources,
  };
}

export function formatSiweMessage(message: SiweMessage): string {
  const lines = [
    `${message.domain} wants you to sign in with your Ethereum account:`,
    message.address,
    '',
    message.statement,
    '',
    `URI: ${message.uri}`,
    `Version: ${message.version}`,
    `Chain ID: ${message.chainId}`,
    `Nonce: ${message.nonce}`,
    `Issued At: ${message.issuedAt}`,
  ];

  if (message.expirationTime) {
    lines.push(`Expiration Time: ${message.expirationTime}`);
  }

  if (message.resources && message.resources.length > 0) {
    lines.push('Resources:');
    message.resources.forEach(resource => {
      lines.push(`- ${resource}`);
    });
  }

  return lines.join('\n');
}

export function parseSiweMessage(messageString: string): SiweMessage | null {
  try {
    const lines = messageString.split('\n');
    
    const domainMatch = lines[0]?.match(/^(.+) wants you to sign in/);
    const domain = domainMatch?.[1] || '';
    const address = lines[1] || '';
    const statement = lines[3] || '';
    
    const getField = (prefix: string): string | undefined => {
      const line = lines.find(l => l.startsWith(prefix));
      return line?.replace(prefix, '').trim();
    };

    const uri = getField('URI: ') || '';
    const version = getField('Version: ') || '1';
    const chainId = parseInt(getField('Chain ID: ') || '0', 10);
    const nonce = getField('Nonce: ') || '';
    const issuedAt = getField('Issued At: ') || '';
    const expirationTime = getField('Expiration Time: ');

    const resourcesIndex = lines.findIndex(l => l === 'Resources:');
    const resources: string[] = [];
    if (resourcesIndex !== -1) {
      for (let i = resourcesIndex + 1; i < lines.length; i++) {
        if (lines[i].startsWith('- ')) {
          resources.push(lines[i].slice(2));
        }
      }
    }

    return {
      domain,
      address,
      statement,
      uri,
      version,
      chainId,
      nonce,
      issuedAt,
      expirationTime,
      resources: resources.length > 0 ? resources : undefined,
    };
  } catch {
    return null;
  }
}

export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifySiweSignature(
  message: string,
  signature: `0x${string}`,
  expectedAddress: string
): Promise<boolean> {
  try {
    const recoveredAddress = await verifyMessage({
      message,
      signature,
      address: expectedAddress as `0x${string}`,
    });
    return recoveredAddress;
  } catch (error) {
    console.error('SIWE verification failed:', error);
    return false;
  }
}

export function isSiweMessageExpired(message: SiweMessage): boolean {
  if (!message.expirationTime) return false;
  return new Date(message.expirationTime) < new Date();
}

export function validateSiweMessage(
  message: SiweMessage,
  expectedAddress: string,
  expectedChainId: number
): { valid: boolean; error?: string } {
  if (message.address.toLowerCase() !== expectedAddress.toLowerCase()) {
    return { valid: false, error: 'Address mismatch' };
  }

  if (message.chainId !== expectedChainId) {
    return { valid: false, error: 'Chain ID mismatch' };
  }

  if (isSiweMessageExpired(message)) {
    return { valid: false, error: 'Message expired' };
  }

  if (message.domain !== window.location.host) {
    return { valid: false, error: 'Domain mismatch' };
  }

  return { valid: true };
}
