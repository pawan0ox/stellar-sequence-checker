import StoreSequenceCard from '../StoreSequenceCard';

export default function StoreSequenceCardExample() {
  const handleStore = async (address: string, sequence: string) => {
    console.log('Storing sequence:', { address, sequence });
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="p-4 max-w-md">
      <StoreSequenceCard isConnected={true} onStore={handleStore} />
    </div>
  );
}
