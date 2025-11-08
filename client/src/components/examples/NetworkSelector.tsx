import { useState } from 'react';
import NetworkSelector from '../NetworkSelector';
import { StellarNetwork } from '@/lib/stellar';

export default function NetworkSelectorExample() {
  const [network, setNetwork] = useState<StellarNetwork>('testnet');
  
  return (
    <div className="p-4">
      <NetworkSelector network={network} onNetworkChange={setNetwork} />
    </div>
  );
}
