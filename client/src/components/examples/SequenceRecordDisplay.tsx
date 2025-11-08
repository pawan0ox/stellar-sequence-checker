import SequenceRecordDisplay from '../SequenceRecordDisplay';

export default function SequenceRecordDisplayExample() {
  const record = {
    accountAddress: 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    sequenceNumber: '123456789',
    network: 'testnet',
  };

  return (
    <div className="p-4 max-w-md">
      <SequenceRecordDisplay record={record} />
    </div>
  );
}
