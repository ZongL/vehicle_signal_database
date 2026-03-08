'use client';

import { signalFields } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createSignals, signalState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function CreateSignalForm() {
  const initialState: signalState = { message: '', errors: {} };
  const [sigState, formAction] = useActionState(createSignals, initialState);

  const hasErrors = sigState.errors && Object.keys(sigState.errors).length > 0;

  return (
    <form action={formAction}>
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              {signalFields.map((field) => (
                <th
                  key={field.name}
                  className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap"
                >
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Input row */}
            <tr className="border-b border-gray-100">
              {signalFields.map((field) => {
                const hasError = sigState.errors?.[field.name]?.length;
                const cellClass = `px-2 py-2 ${hasError ? 'bg-red-50' : ''}`;
                const inputClass =
                  'block w-full rounded border border-gray-300 py-1.5 px-2 text-sm outline-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' +
                  (hasError ? ' border-red-400' : '');

                if (field.name === 'byteorder') {
                  return (
                    <td key={field.name} className={cellClass}>
                      <select
                        name="byteorder"
                        className={inputClass + ' cursor-pointer'}
                        defaultValue=""
                        style={{ minWidth: '120px' }}
                      >
                        <option value="" disabled>--</option>
                        <option value="big-endian">Big-Endian</option>
                        <option value="little-endian">Little-Endian</option>
                      </select>
                    </td>
                  );
                }

                if (field.name === 'valuetype') {
                  return (
                    <td key={field.name} className={cellClass}>
                      <select
                        name="valuetype"
                        className={inputClass + ' cursor-pointer'}
                        defaultValue=""
                        style={{ minWidth: '100px' }}
                      >
                        <option value="" disabled>--</option>
                        <option value="signed">Signed</option>
                        <option value="unsigned">Unsigned</option>
                      </select>
                    </td>
                  );
                }

                const isWide = field.name === 'name' || field.name === 'description';

                return (
                  <td key={field.name} className={cellClass}>
                    <input
                      name={field.name}
                      type={field.type === 'number' ? 'number' : 'text'}
                      placeholder={field.label}
                      className={inputClass}
                      style={{ minWidth: isWide ? '150px' : '90px' }}
                    />
                  </td>
                );
              })}
            </tr>
            {/* Error row - only shown when there are errors */}
            {hasErrors && (
              <tr>
                {signalFields.map((field) => (
                  <td key={field.name} className="px-2 pt-1 pb-2 align-top">
                    {sigState.errors?.[field.name]?.map((error: string) => (
                      <p className="text-xs text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {sigState.message && (
        <p className="mt-2 text-sm text-red-500">{sigState.message}</p>
      )}
      <div className="mt-4 flex justify-end gap-4">
        <Link
          href="/dashboard/signals"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Signal</Button>
      </div>
    </form>
  );
}
