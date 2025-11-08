import { useState } from 'react';
import WalletConnect from '../WalletConnect';

export default function WalletConnectExample() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress] = useState('GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

  return (
    <div className="p-4">
      <WalletConnect
        walletAddress={isConnected ? walletAddress : null}
        isConnected={isConnected}
        isConnecting={false}
        onConnect={() => setIsConnected(true)}
        onDisconnect={() => setIsConnected(false)}
      />
    </div>
  );
}
