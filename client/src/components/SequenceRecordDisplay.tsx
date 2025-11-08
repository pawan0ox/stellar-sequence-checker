import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface SequenceRecord {
  accountAddress: string;
  sequenceNumber: string;
  network: string;
}

interface SequenceRecordDisplayProps {
  record: SequenceRecord | null;
}

export default function SequenceRecordDisplay({ record }: SequenceRecordDisplayProps) {
  if (!record) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle>Sequence Record</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Account Address</div>
            <div className="font-mono text-sm break-all" data-testid="text-account-address">
              {record.accountAddress}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Sequence Number</div>
            <div className="font-mono text-2xl font-bold" data-testid="text-sequence-number">
              {record.sequenceNumber}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Network</div>
            <div className="text-sm capitalize font-medium" data-testid="text-network">
              {record.network}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
