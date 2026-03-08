import CreateSignalForm from '@/app/ui/signals/create-form-test';
import Breadcrumbs from '@/app/ui/signals/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Signals',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Signals', href: '/dashboard/signals' },
          {
            label: 'Create Signals',
            href: '/dashboard/signals/create',
            active: true,
          },
        ]}
      />
      <CreateSignalForm/>
    </main>
  );
}
