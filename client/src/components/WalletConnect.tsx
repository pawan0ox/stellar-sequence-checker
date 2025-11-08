import { Wallet, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { truncateAddress } from '@/lib/stellar';

interface WalletConnectProps {
  walletAddress: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function WalletConnect({
  walletAddress,
  isConnected,
  isConnecting,
  onConnect,
  onDisconnect,
}: WalletConnectProps) {
  if (isConnected && walletAddress) {
    return (
      <Button
        variant="outline"
        onClick={onDisconnect}
        data-testid="button-disconnect-wallet"
        className="gap-2 font-mono"
      >
        <Check className="h-4 w-4 text-green-500" />
        {truncateAddress(walletAddress)}
      </Button>
    );
  }

  return (
    <Button
      onClick={onConnect}
      disabled={isConnecting}
      data-testid="button-connect-wallet"
      className="gap-2"
    >
      <Wallet className="h-4 w-4" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}
