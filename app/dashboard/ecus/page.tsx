import { fetchAllECUs } from '@/app/lib/data';
import ECUsDataTable from '@/app/ui/ecus/ecus-datatable';
import { CreateECU } from '@/app/ui/ecus/buttons';
import ECUTopology from '@/app/ui/ecus/ecu-topology';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ECUs',
};

export default async function Page() {
  const ecus = await fetchAllECUs();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">ECUs</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div />
        <CreateECU />
      </div>
      <ECUsDataTable ecus={ecus} />
      <div className="mt-8">
        <h2 className="text-xl mb-4">Topology Visualization</h2>
        <ECUTopology />
      </div>
    </div>
  );
}
