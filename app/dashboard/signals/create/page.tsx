import { fetchSignals } from '@/app/lib/data';

import CreateSignalForm from '@/app/ui/signals/create-form-test';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Signals',
};

export default async function Page() {
  const customers = await fetchSignals();

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
      {/* <Form customers={customers} />   */}
      <CreateSignalForm customers={customers} />
    </main>
  );
}
