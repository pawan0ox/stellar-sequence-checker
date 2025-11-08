import { useState, useEffect } from 'react';
import { checkFreighterConnection, connectFreighterWallet } from '@/lib/stellar';

export function useStellarWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    const connected = await checkFreighterConnection();
    if (connected) {
      const address = await connectFreighterWallet();
      if (address) {
        setWalletAddress(address);
        setIsConnected(true);
      }
    }
  }

  async function connect() {
    setIsConnecting(true);
    try {
      const address = await connectFreighterWallet();
      if (address) {
        setWalletAddress(address);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  }

  function disconnect() {
    setWalletAddress(null);
    setIsConnected(false);
  }

  return {
    walletAddress,
    isConnected,
    isConnecting,
    connect,
    disconnect,
  };
}
