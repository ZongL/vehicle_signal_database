'use client';

import { SignalsTable } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createSignals, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function CreateSignalForm({ customers }: { customers: SignalsTable[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createSignals, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Signal Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Signal Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter signal name"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Signal Length */}
        <div className="mb-4">
          <label htmlFor="length" className="mb-2 block text-sm font-medium">
            Signal Length
          </label>
          <input
            id="length"
            name="length"
            type="number"
            step="1"
            placeholder="Enter length"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="length-error"
          />
          <div id="length-error" aria-live="polite" aria-atomic="true">
            {state.errors?.length &&
              state.errors.length.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Byte Order */}
        <div className="mb-4">
          <label htmlFor="byteorder" className="mb-2 block text-sm font-medium">
            Byte Order
          </label>
          <select
            id="byteorder"
            name="byteorder"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            aria-describedby="byteorder-error"
          >
            <option value="" disabled>
              Select byte order
            </option>
            <option value="big-endian">Big-Endian</option>
            <option value="little-endian">Little-Endian</option>
          </select>
          <div id="byteorder-error" aria-live="polite" aria-atomic="true">
            {state.errors?.byteorder &&
              state.errors.byteorder.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Value Type */}
        <div className="mb-4">
          <label htmlFor="valuetype" className="mb-2 block text-sm font-medium">
            Value Type
          </label>
          <select
            id="valuetype"
            name="valuetype"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            aria-describedby="valuetype-error"
          >
            <option value="" disabled>
              Select value type
            </option>
            <option value="signed">Signed</option>
            <option value="unsigned">Unsigned</option>
          </select>
          <div id="valuetype-error" aria-live="polite" aria-atomic="true">
            {state.errors?.valuetype &&
              state.errors.valuetype.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Initial Value */}
        <div className="mb-4">
          <label htmlFor="initialvalue" className="mb-2 block text-sm font-medium">
            Initial Value (optional)
          </label>
          <input
            id="initialvalue"
            name="initialvalue"
            type="number"
            step="1"
            placeholder="Enter initial value"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="initialvalue-error"
          />
          <div id="initialvalue-error" aria-live="polite" aria-atomic="true">
            {state.errors?.initialvalue &&
              state.errors.initialvalue.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Factor */}
        <div className="mb-4">
          <label htmlFor="factor" className="mb-2 block text-sm font-medium">
            Factor (optional)
          </label>
          <input
            id="factor"
            name="factor"
            type="number"
            step="0.01"
            placeholder="Enter factor"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="factor-error"
          />
          <div id="factor-error" aria-live="polite" aria-atomic="true">
            {state.errors?.factor &&
              state.errors.factor.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Signal Offset */}
        <div className="mb-4">
          <label htmlFor="sigoffset" className="mb-2 block text-sm font-medium">
            Signal Offset (optional)
          </label>
          <input
            id="sigoffset"
            name="sigoffset"
            type="number"
            step="0.01"
            placeholder="Enter signal offset"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="sigoffset-error"
          />
          <div id="sigoffset-error" aria-live="polite" aria-atomic="true">
            {state.errors?.sigoffset &&
              state.errors.sigoffset.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Min Value */}
        <div className="mb-4">
          <label htmlFor="minivalue" className="mb-2 block text-sm font-medium">
            Min Value (optional)
          </label>
          <input
            id="minivalue"
            name="minivalue"
            type="number"
            step="0.01"
            placeholder="Enter min value"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="minivalue-error"
          />
          <div id="minivalue-error" aria-live="polite" aria-atomic="true">
            {state.errors?.minivalue &&
              state.errors.minivalue.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Max Value */}
        <div className="mb-4">
          <label htmlFor="maxvalue" className="mb-2 block text-sm font-medium">
            Max Value (optional)
          </label>
          <input
            id="maxvalue"
            name="maxvalue"
            type="number"
            step="0.01"
            placeholder="Enter max value"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="maxvalue-error"
          />
          <div id="maxvalue-error" aria-live="polite" aria-atomic="true">
            {state.errors?.maxvalue &&
              state.errors.maxvalue.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Unit */}
        <div className="mb-4">
          <label htmlFor="unit" className="mb-2 block text-sm font-medium">
            Unit (optional)
          </label>
          <input
            id="unit"
            name="unit"
            type="text"
            placeholder="Enter unit"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="unit-error"
          />
          <div id="unit-error" aria-live="polite" aria-atomic="true">
            {state.errors?.unit &&
              state.errors.unit.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
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