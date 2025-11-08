import { useState } from 'react';
import ContractConfig from '../ContractConfig';

export default function ContractConfigExample() {
  const [contractAddress, setContractAddress] = useState(
    'CCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  );

  return (
    <div className="p-4 max-w-2xl">
      <ContractConfig
        contractAddress={contractAddress}
        onContractAddressChange={setContractAddress}
      />
    </div>
  );
}
