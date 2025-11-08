import { Database } from 'lucide-react';
import WalletConnect from './WalletConnect';
import NetworkSelector from './NetworkSelector';
import ThemeToggle from './ThemeToggle';
import { StellarNetwork } from '@/lib/stellar';

interface HeaderProps {
  walletAddress: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  network: StellarNetwork;
  onConnect: () => void;
  onDisconnect: () => void;
  onNetworkChange: (network: StellarNetwork) => void;
}

export default function Header({
  walletAddress,
  isConnected,
  isConnecting,
  network,
  onConnect,
  onDisconnect,
  onNetworkChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Database className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Sequence Checker</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <NetworkSelector network={network} onNetworkChange={onNetworkChange} />
          <WalletConnect
            walletAddress={walletAddress}
            isConnected={isConnected}
            isConnecting={isConnecting}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
