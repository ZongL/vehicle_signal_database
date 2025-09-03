'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createMessage } from '@/app/lib/actions';
import { CheckIcon, ClockIcon, UserCircleIcon, CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

// Main Create Message Form
export default function CreateMessageForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createMessage, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Message Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Message Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter message name (e.g., EngineStatus)"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Message ID */}
        <div className="mb-4">
          <label htmlFor="message_id" className="mb-2 block text-sm font-medium">
            CAN Message ID
          </label>
          <div className="relative">
            <input
              id="message_id"
              name="message_id"
              type="text"
              placeholder="0x123"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="message_id-error"
              required
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Enter CAN ID in hexadecimal format (e.g., 0x123, 0x456)
          </p>
          <div id="message_id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.message_id &&
              state.errors.message_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* DLC */}
        <div className="mb-4">
          <label htmlFor="dlc" className="mb-2 block text-sm font-medium">
            DLC (Data Length Code)
          </label>
          <div className="relative">
            <select
              id="dlc"
              name="dlc"
              defaultValue="8"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
              aria-describedby="dlc-error"
            >
              <option value="1">1 byte</option>
              <option value="2">2 bytes</option>
              <option value="3">3 bytes</option>
              <option value="4">4 bytes</option>
              <option value="5">5 bytes</option>
              <option value="6">6 bytes</option>
              <option value="7">7 bytes</option>
              <option value="8">8 bytes</option>
            </select>
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Number of data bytes in the CAN frame (1-8 bytes)
          </p>
          <div id="dlc-error" aria-live="polite" aria-atomic="true">
            {state.errors?.dlc &&
              state.errors.dlc.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Cycle Time */}
        <div className="mb-4">
          <label htmlFor="cycle_time" className="mb-2 block text-sm font-medium">
            Cycle Time (ms) - Optional
          </label>
          <div className="relative">
            <input
              id="cycle_time"
              name="cycle_time"
              type="number"
              min="1"
              max="10000"
              placeholder="100"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Message transmission cycle time in milliseconds
          </p>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description - Optional
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Enter message description..."
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-3 h-[18px] w-[18px] text-gray-500" />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Optional description for this CAN message
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Next Steps
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  After creating the message, you can add and configure signals on the main Messages page by editing the message.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">
              {state.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard/messages"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600"
        >
          <span className="hidden md:block">Create Message</span>
          <CheckIcon className="h-5 md:ml-4" />
        </button>
      </div>
    </form>
  );
}