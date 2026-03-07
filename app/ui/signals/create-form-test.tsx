'use client';

import { signalFields } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createSignals, signalState } from '@/app/lib/actions';
import { useActionState } from 'react';

const groupOrder = [
  'Basic Info',
  'Bit Configuration',
  'Value Conversion',
  'Physical Range',
  'Raw Range',
  'Display',
];

const wideFields = new Set(['name', 'description']);

export default function CreateSignalForm() {
  const initialState: signalState = { message: '', errors: {} };
  const [sigState, formAction] = useActionState(createSignals, initialState);

  // Group fields by their group property
  const grouped = groupOrder.map((group) => ({
    group,
    fields: signalFields.filter((f) => f.group === group),
  }));

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {grouped.map(({ group, fields }) => (
          <div key={group} className="mb-6">
            <h3 className="text-base font-semibold text-gray-700 mb-3">
              {group}
            </h3>
            <hr className="mb-4 border-gray-200" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {fields.map((field) => {
                let inputEl = null;
                if (field.name === 'byteorder') {
                  inputEl = (
                    <select
                      id="byteorder"
                      name="byteorder"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                      defaultValue=""
                      aria-describedby="byteorder-error"
                    >
                      <option value="" disabled>
                        Select byte order
                      </option>
                      <option value="big-endian">Big-Endian</option>
                      <option value="little-endian">Little-Endian</option>
                    </select>
                  );
                } else if (field.name === 'valuetype') {
                  inputEl = (
                    <select
                      id="valuetype"
                      name="valuetype"
                      className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                      defaultValue=""
                      aria-describedby="valuetype-error"
                    >
                      <option value="" disabled>
                        Select value type
                      </option>
                      <option value="signed">Signed</option>
                      <option value="unsigned">Unsigned</option>
                    </select>
                  );
                } else {
                  inputEl = (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type === 'number' ? 'number' : 'text'}
                      placeholder={`Enter ${field.label}`}
                      className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                      aria-describedby={`${field.name}-error`}
                    />
                  );
                }
                return (
                  <div
                    key={field.name}
                    className={wideFields.has(field.name) ? 'col-span-2' : ''}
                  >
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-medium"
                    >
                      {field.label}
                    </label>
                    {inputEl}
                    <div
                      id={`${field.name}-error`}
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {sigState.errors?.[field.name] &&
                        sigState.errors[field.name]?.map((error: string) => (
                          <p
                            className="mt-2 text-sm text-red-500"
                            key={error}
                          >
                            {error}
                          </p>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div aria-live="polite" aria-atomic="true">
          {sigState.message ? (
            <p className="mt-2 text-sm text-red-500">{sigState.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
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
