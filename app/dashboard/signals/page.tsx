import SignalsDataTable from '@/app/ui/signals/signals-datatable';
import { CreateSignal, ExportCSV } from '@/app/ui/signals/buttons';
import { lusitana } from '@/app/ui/fonts';
import { fetchAllSignals } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signals',
};

export default async function Page() {
  const signals = await fetchAllSignals();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>All-Signals</h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
        <CreateSignal />
        <ExportCSV />
      </div>
      <SignalsDataTable signals={signals} />
    </div>
  );
}
