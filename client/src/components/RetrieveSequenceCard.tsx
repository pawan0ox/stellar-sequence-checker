import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SequenceRecord {
  accountAddress: string;
  sequenceNumber: string;
  network: string;
}

interface RetrieveSequenceCardProps {
  network: string;
  onRetrieve: (accountAddress: string) => Promise<SequenceRecord>;
  onRecordFound: (record: SequenceRecord | null) => void;
}

export default function RetrieveSequenceCard({
  network,
  onRetrieve,
  onRecordFound,
}: RetrieveSequenceCardProps) {
  const [accountAddress, setAccountAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountAddress) {
      toast({
        variant: 'destructive',
        title: 'Missing field',
        description: 'Please enter an account address',
      });
      return;
    }

    setIsLoading(true);
    try {
      const record = await onRetrieve(accountAddress);
      onRecordFound(record);
      toast({
        title: 'Success',
        description: 'Sequence record retrieved',
      });
    } catch (error) {
      onRecordFound(null);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to retrieve sequence',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          <CardTitle>Check Sequence Number</CardTitle>
        </div>
        <CardDescription>
          Query live blockchain data for any Stellar account. Enter a valid Stellar address starting with 'G'.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="retrieve-address">Stellar Account Address</Label>
            <Input
              id="retrieve-address"
              data-testid="input-retrieve-address"
              placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
              className="font-mono text-sm"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            data-testid="button-retrieve-sequence"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Retrieving...
              </>
            ) : (
              'Retrieve Sequence'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
