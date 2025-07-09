import { signalFields } from '@/app/lib/definitions';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import { fetchFilteredSignals } from '@/app/lib/data';

export default async function SignalsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const signals = await fetchFilteredSignals(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {signals?.map((signal) => (
              <div
                key={signal.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center"></div>
                    <p className="text-sm text-gray-500">{signal.name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{signal.initialvalue}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={signal.id} />
                    <DeleteInvoice id={signal.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {signalFields.map((field) => (
                  <th key={field.name} scope="col" className="px-3 py-5 font-medium">
                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                  </th>
                ))}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {signals?.map((signal) => (
                <tr
                  key={signal.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {signalFields.map((field) => (
                    <td key={field.name} className="whitespace-nowrap px-3 py-3">
                      {(signal as any)[field.name]}
                    </td>
                  ))}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={signal.id} />
                      <DeleteInvoice id={signal.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
