import RemoveSequenceCard from '../RemoveSequenceCard';

export default function RemoveSequenceCardExample() {
  const handleRemove = async (address: string) => {
    console.log('Removing sequence for:', address);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="p-4 max-w-md">
      <RemoveSequenceCard isConnected={true} onRemove={handleRemove} />
    </div>
  );
}
