import Form from '@/app/ui/messages/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Messages', href: '/dashboard/messages' },
          {
            label: 'Create Message',
            href: '/dashboard/messages/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}