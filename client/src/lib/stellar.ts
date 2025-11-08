import * as StellarSdk from '@stellar/stellar-sdk';
import freighterApi from '@stellar/freighter-api';

export type StellarNetwork = 'testnet' | 'mainnet';

export const NETWORK_CONFIG = {
  testnet: {
    name: 'Testnet',
    url: 'https://soroban-testnet.stellar.org',
    passphrase: StellarSdk.Networks.TESTNET,
  },
  mainnet: {
    name: 'Mainnet',
    url: 'https://soroban-mainnet.stellar.org',
    passphrase: StellarSdk.Networks.PUBLIC,
  },
};

export const DEFAULT_CONTRACT_ADDRESS = 'CCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

export async function checkFreighterConnection(): Promise<boolean> {
  try {
    const result = await freighterApi.isConnected();
    return result.isConnected;
  } catch (error) {
    console.error('Error checking Freighter connection:', error);
    return false;
  }
}

export async function connectFreighterWallet(): Promise<string | null> {
  try {
    const result = await freighterApi.getAddress();
    return result.address;
  } catch (error) {
    console.error('Error connecting to Freighter:', error);
    return null;
  }
}

export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (!address || address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}
