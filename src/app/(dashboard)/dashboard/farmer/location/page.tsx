"use client";
import dynamic from 'next/dynamic';
const LeafletMap = dynamic(() => import('../../../../components/Map/LeafletMap'), {
  ssr: false,
});

export default function AdminLocationPage() {
  const Position:[number,number] = [27.7172, 85.3240]; 

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4"> Live Location</h1>
      <LeafletMap position={Position} />
    </div>
  );
}
