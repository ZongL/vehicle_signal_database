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
import { createSignals, signalState } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function CreateSignalForm({ customers }: { customers: SignalsTable[] }) {
  const initialState: signalState = { message: null, errors: {} }; // 确保 initialState 的类型定义正确
  const [sigState, formAction] = useActionState(createSignals, initialState); // 确保 useActionState 的调用方式符合要求

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
            {sigState.errors?.name &&
              sigState.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
          
        {/* Description */}
          <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Enter signal description"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="description-error"
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {sigState.errors?.description &&
              sigState.errors.description.map((error: string) => (
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
            {sigState.errors?.length &&
              sigState.errors.length.map((error: string) => (
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
            {sigState.errors?.byteorder &&
              sigState.errors.byteorder.map((error: string) => (
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
            {sigState.errors?.valuetype &&
              sigState.errors.valuetype.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Start Byte */}
        <div className="mb-4">
          <label htmlFor="startbyte" className="mb-2 block text-sm font-medium">
            Start Byte
          </label>
          <input
            id="startbyte"
            name="startbyte"
            type="number"
            step="1"
            placeholder="Enter start byte"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="startbyte-error"
          />
          <div id="startbyte-error" aria-live="polite" aria-atomic="true">
            {sigState.errors?.startbyte &&
              sigState.errors.startbyte.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Start Bit */}
        <div className="mb-4">
          <label htmlFor="startbit" className="mb-2 block text-sm font-medium">
            Start Bit
          </label>
          <input
            id="startbit"
            name="startbit"
            type="number"
            step="1"
            placeholder="Enter start bit"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="startbit-error"
          />
          <div id="startbit-error" aria-live="polite" aria-atomic="true">
            {sigState.errors?.startbit &&
              sigState.errors.startbit.map((error: string) => (
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
            {sigState.errors?.initialvalue &&
              sigState.errors.initialvalue.map((error: string) => (
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
            {sigState.errors?.factor &&
              sigState.errors.factor.map((error: string) => (
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
            {sigState.errors?.sigoffset &&
              sigState.errors.sigoffset.map((error: string) => (
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
            {sigState.errors?.minivalue &&
              sigState.errors.minivalue.map((error: string) => (
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
            {sigState.errors?.maxvalue &&
              sigState.errors.maxvalue.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Raw Min Value */}
        <div className="mb-4">
          <label htmlFor="rawminivalue" className="mb-2 block text-sm font-medium">
            Raw Min Value
          </label>
          <input
            id="rawminivalue"
            name="rawminivalue"
            type="number"
            step="0.01"
            placeholder="Enter raw min value"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="rawminivalue-error"
          />
          <div id="rawminivalue-error" aria-live="polite" aria-atomic="true">
            {sigState.errors?.rawminivalue &&
              sigState.errors.rawminivalue.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Raw Max Value */}
        <div className="mb-4">
          <label htmlFor="rawmaxvalue" className="mb-2 block text-sm font-medium">
            Raw Max Value
          </label>
          <input
            id="rawmaxvalue"
            name="rawmaxvalue"
            type="number"
            step="0.01"
            placeholder="Enter raw max value"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="rawmaxvalue-error"
          />
          <div id="rawmaxvalue-error" aria-live="polite" aria-atomic="true">
            {sigState.errors?.rawmaxvalue &&
              sigState.errors.rawmaxvalue.map((error: string) => (
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
            {sigState.errors?.unit &&
              sigState.errors.unit.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
        {/* Value Description */}
        <div className="mb-4">
          <label htmlFor="valuedescription" className="mb-2 block text-sm font-medium">
            Value Description
          </label>
          <input
            id="valuedescription"
            name="valuedescription"
            type="text"
            placeholder="Enter value description"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="valuedescription-error"
          />
          <div id="valuedescription-error" aria-live="polite" aria-atomic="true">
            {sigState.errors?.valuedescription &&
              sigState.errors.valuedescription.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

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

