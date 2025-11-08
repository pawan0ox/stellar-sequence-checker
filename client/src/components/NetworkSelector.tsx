import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NETWORK_CONFIG, StellarNetwork } from '@/lib/stellar';

interface NetworkSelectorProps {
  network: StellarNetwork;
  onNetworkChange: (network: StellarNetwork) => void;
}

export default function NetworkSelector({ network, onNetworkChange }: NetworkSelectorProps) {
  return (
    <Select value={network} onValueChange={(value) => onNetworkChange(value as StellarNetwork)}>
      <SelectTrigger className="w-32" data-testid="select-network">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="testnet" data-testid="option-testnet">
          {NETWORK_CONFIG.testnet.name}
        </SelectItem>
        <SelectItem value="mainnet" data-testid="option-mainnet">
          {NETWORK_CONFIG.mainnet.name}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
