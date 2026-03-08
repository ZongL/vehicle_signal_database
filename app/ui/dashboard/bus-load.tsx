import { SignalIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function BusLoad() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Bus Load
      </h2>
      <div className="flex grow flex-col rounded-xl bg-gray-50 p-4">
        <div className="flex flex-col items-center justify-center grow bg-white rounded-lg px-6 py-8">
          <SignalIcon className="h-12 w-12 text-gray-300" />
          <p className="mt-4 text-sm text-gray-400">No bus load data available</p>
          <p className="mt-1 text-xs text-gray-300">Data will appear here once configured</p>
        </div>
      </div>
    </div>
  );
}
