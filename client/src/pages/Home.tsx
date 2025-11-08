import { useState } from 'react';
import { useStellarWallet } from '@/hooks/useStellarWallet';
import { StellarNetwork } from '@/lib/stellar';
import Header from '@/components/Header';
import RetrieveSequenceCard from '@/components/RetrieveSequenceCard';
import SequenceRecordDisplay from '@/components/SequenceRecordDisplay';

interface SequenceRecord {
  accountAddress: string;
  sequenceNumber: string;
  network: string;
}

export default function Home() {
  const { walletAddress, isConnected, isConnecting, connect, disconnect } = useStellarWallet();
  const [network, setNetwork] = useState<StellarNetwork>('testnet');
  const [retrievedRecord, setRetrievedRecord] = useState<SequenceRecord | null>(null);

  const handleRetrieve = async (accountAddress: string): Promise<SequenceRecord> => {
    const response = await fetch('/api/sequence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_id: accountAddress,
        network: network,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to retrieve sequence number');
    }

    const data = await response.json();
    return {
      accountAddress: data.account_id,
      sequenceNumber: data.sequence,
      network: data.network,
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        walletAddress={walletAddress}
        isConnected={isConnected}
        isConnecting={isConnecting}
        network={network}
        onConnect={connect}
        onDisconnect={disconnect}
        onNetworkChange={setNetwork}
      />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Account Sequence Number Checker
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check the current sequence number of any Stellar account directly from the blockchain
            </p>
          </div>

          <div className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <RetrieveSequenceCard
                network={network}
                onRetrieve={handleRetrieve}
                onRecordFound={setRetrievedRecord}
              />
            </div>

            {retrievedRecord && (
              <div className="max-w-2xl mx-auto">
                <SequenceRecordDisplay record={retrievedRecord} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Network:</span>
              <span className="font-medium capitalize">{network}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
