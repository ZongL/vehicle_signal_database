import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
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
                    <div className="mb-2 flex items-center">

                    </div>
                    <p className="text-sm text-gray-500">{signal.name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(signal.initialvalue)}
                    </p>
                    <p>{formatCurrency(signal.initialvalue)}</p>
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
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Length
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Byteorder
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Valuetype
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Initialvalue
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Factor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Sigoffset
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Minivalue
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Maxvalue
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Unit
                </th>
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
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{signal.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {signal.length}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {signal.byteorder}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {signal.valuetype}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {signal.initialvalue}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {(signal.factor)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {(signal.sigoffset)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {signal.minivalue}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {signal.maxvalue}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {signal.unit}
                  </td>
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
