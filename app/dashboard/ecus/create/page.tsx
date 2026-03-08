import CreateECUForm from '@/app/ui/ecus/create-form';
import Breadcrumbs from '@/app/ui/signals/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create ECU',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'ECUs', href: '/dashboard/ecus' },
          {
            label: 'Create ECU',
            href: '/dashboard/ecus/create',
            active: true,
          },
        ]}
      />
      <CreateECUForm />
    </main>
  );
}
