import { CircleStackIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <CircleStackIcon className="h-12 w-12 rotate-[0deg]" />
      <p className="text-[15px] ">VehicleSignalDatabase</p>
    </div>
  );
}
