import { useState } from 'react';
import Header from '../Header';
import { StellarNetwork } from '@/lib/stellar';

export default function HeaderExample() {
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState<StellarNetwork>('testnet');
  const walletAddress = 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

  return (
    <Header
      walletAddress={isConnected ? walletAddress : null}
      isConnected={isConnected}
      isConnecting={false}
      network={network}
      onConnect={() => setIsConnected(true)}
      onDisconnect={() => setIsConnected(false)}
      onNetworkChange={setNetwork}
    />
  );
}
