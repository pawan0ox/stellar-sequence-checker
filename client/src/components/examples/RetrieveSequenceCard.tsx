import { useState } from 'react';
import RetrieveSequenceCard from '../RetrieveSequenceCard';

export default function RetrieveSequenceCardExample() {
  const handleRetrieve = async (address: string) => {
    console.log('Retrieving sequence for:', address);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      accountAddress: address,
      sequenceNumber: '123456789',
      network: 'testnet',
    };
  };

  return (
    <div className="p-4 max-w-md">
      <RetrieveSequenceCard
        network="testnet"
        onRetrieve={handleRetrieve}
        onRecordFound={(record) => console.log('Record found:', record)}
      />
    </div>
  );
}
