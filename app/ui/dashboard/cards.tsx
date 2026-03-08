import {
  CpuChipIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  ecus: CpuChipIcon,
  messages: EnvelopeIcon,
  signals: DocumentChartBarIcon,
  users: UserGroupIcon,
};

export default async function CardWrapper() {
  const {
    numberOfSignals,
    numberOfUsers,
    numberOfMessages,
    numberOfECUs,
  } = await fetchCardData();

  return (
    <>
      <Card title="Total ECUs" value={numberOfECUs} type="ecus" />
      <Card title="Total Messages" value={numberOfMessages} type="messages" />
      <Card title="Total Signals" value={numberOfSignals} type="signals" />
      <Card title="Total Users" value={numberOfUsers} type="users" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'ecus' | 'messages' | 'signals' | 'users';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
