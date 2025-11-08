import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RemoveSequenceCardProps {
  isConnected: boolean;
  onRemove: (accountAddress: string) => Promise<void>;
}

export default function RemoveSequenceCard({ isConnected, onRemove }: RemoveSequenceCardProps) {
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
      await onRemove(accountAddress);
      toast({
        title: 'Success',
        description: 'Sequence record removed successfully',
      });
      setAccountAddress('');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to remove sequence',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-destructive" />
          <CardTitle>Remove Record</CardTitle>
        </div>
        <CardDescription>
          Delete a stored sequence record
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="remove-address">Account Address</Label>
            <Input
              id="remove-address"
              data-testid="input-remove-address"
              placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
              className="font-mono text-sm"
              disabled={!isConnected}
            />
          </div>

          <Button
            type="submit"
            variant="destructive"
            className="w-full"
            disabled={!isConnected || isLoading}
            data-testid="button-remove-sequence"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              'Remove Record'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
