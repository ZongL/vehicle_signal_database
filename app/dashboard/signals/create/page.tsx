import { fetchSignals } from '@/app/lib/data';
import Form from '@/app/ui/signals/create-form';
import CreateForm from '@/app/ui/signals/create-form-test';
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
      <Form customers={customers} />
      <CreateForm customers={customers} />
    </main>
  );
}
