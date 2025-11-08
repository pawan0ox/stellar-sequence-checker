import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface StoreSequenceCardProps {
  isConnected: boolean;
  onStore: (accountAddress: string, sequenceNumber: string) => Promise<void>;
}

export default function StoreSequenceCard({ isConnected, onStore }: StoreSequenceCardProps) {
  const [accountAddress, setAccountAddress] = useState('');
  const [sequenceNumber, setSequenceNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountAddress || !sequenceNumber) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please fill in all fields',
      });
      return;
    }

    setIsLoading(true);
    try {
      await onStore(accountAddress, sequenceNumber);
      toast({
        title: 'Success',
        description: 'Sequence number stored successfully',
      });
      setAccountAddress('');
      setSequenceNumber('');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to store sequence',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Save className="h-5 w-5 text-primary" />
          <CardTitle>Store Sequence</CardTitle>
        </div>
        <CardDescription>
          Store a sequence number for a Stellar account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-address">Account Address</Label>
            <Input
              id="store-address"
              data-testid="input-store-address"
              placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
              className="font-mono text-sm"
              disabled={!isConnected}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store-sequence">Sequence Number</Label>
            <Input
              id="store-sequence"
              data-testid="input-store-sequence"
              type="number"
              placeholder="123456789"
              value={sequenceNumber}
              onChange={(e) => setSequenceNumber(e.target.value)}
              className="font-mono"
              disabled={!isConnected}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isConnected || isLoading}
            data-testid="button-store-sequence"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Storing...
              </>
            ) : (
              'Store Sequence'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
