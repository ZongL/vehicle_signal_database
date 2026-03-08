'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { createMessage } from '@/app/lib/actions';
import { CheckIcon, ClockIcon, UserCircleIcon, CurrencyDollarIcon, DocumentTextIcon, CpuChipIcon } from '@heroicons/react/24/outline';

// Main Create Message Form
export default function CreateMessageForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createMessage, initialState);
  const [ecus, setEcus] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch('/api/ecus')
      .then((res) => res.json())
      .then((data) => setEcus(data))
      .catch(() => setEcus([]));
  }, []);

  return (
    <form action={dispatch} className="max-w-2xl">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Row 1: Name + CAN ID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-3">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Message Name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g., EngineStatus"
                className="peer block w-full rounded-md border border-gray-200 py-[6px] pl-9 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-1 text-xs text-red-500" key={error}>{error}</p>
                ))}
            </div>
          </div>

          <div>
            <label htmlFor="message_id" className="mb-1 block text-sm font-medium">
              CAN Message ID
            </label>
            <div className="relative">
              <input
                id="message_id"
                name="message_id"
                type="text"
                placeholder="0x123"
                className="peer block w-full rounded-md border border-gray-200 py-[6px] pl-9 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="message_id-error"
                required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <div id="message_id-error" aria-live="polite" aria-atomic="true">
              {state.errors?.message_id &&
                state.errors.message_id.map((error: string) => (
                  <p className="mt-1 text-xs text-red-500" key={error}>{error}</p>
                ))}
            </div>
          </div>
        </div>

        {/* Row 2: DLC + Cycle Time */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-3">
          <div>
            <label htmlFor="dlc" className="mb-1 block text-sm font-medium">
              DLC (Data Length Code)
            </label>
            <div className="relative">
              <select
                id="dlc"
                name="dlc"
                defaultValue="8"
                className="peer block w-full rounded-md border border-gray-200 py-[6px] pl-9 text-sm outline-2"
                aria-describedby="dlc-error"
              >
                {[1,2,3,4,5,6,7,8,12,16,20,24,32,48,64].map(n => (
                  <option key={n} value={n}>{n} byte{n > 1 ? 's' : ''}{n > 8 ? ' (CAN FD)' : ''}</option>
                ))}
              </select>
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
            <div id="dlc-error" aria-live="polite" aria-atomic="true">
              {state.errors?.dlc &&
                state.errors.dlc.map((error: string) => (
                  <p className="mt-1 text-xs text-red-500" key={error}>{error}</p>
                ))}
            </div>
          </div>

          <div>
            <label htmlFor="cycle_time" className="mb-1 block text-sm font-medium">
              Cycle Time (ms)
            </label>
            <div className="relative">
              <input
                id="cycle_time"
                name="cycle_time"
                type="number"
                min="1"
                max="10000"
                placeholder="100"
                className="peer block w-full rounded-md border border-gray-200 py-[6px] pl-9 text-sm outline-2 placeholder:text-gray-500"
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Row 3: Sender ECU */}
        <div className="mb-3">
          <label htmlFor="sender_ecu_id" className="mb-1 block text-sm font-medium">
            Sender ECU
          </label>
          <div className="relative md:w-1/2">
            <select
              id="sender_ecu_id"
              name="sender_ecu_id"
              defaultValue=""
              className="peer block w-full rounded-md border border-gray-200 py-[6px] pl-9 text-sm outline-2"
            >
              <option value="">None</option>
              {ecus.map((ecu) => (
                <option key={ecu.id} value={ecu.id}>{ecu.name}</option>
              ))}
            </select>
            <CpuChipIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Row 4: Description */}
        <div className="mb-3">
          <label htmlFor="description" className="mb-1 block text-sm font-medium">
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows={2}
              placeholder="Optional description..."
              className="peer block w-full rounded-md border border-gray-200 py-[6px] pl-9 text-sm outline-2 placeholder:text-gray-500"
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-2 h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Tips */}
        <div className="flex items-start gap-2 rounded-md bg-blue-50 border border-blue-200 px-3 py-2">
          <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
          <p className="text-xs text-blue-700">
            After creating the message, you can add and configure signals on the main Messages page by editing the message.
          </p>
        </div>

        {/* Error message */}
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-1 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <Link
          href="/dashboard/messages"
          className="flex h-9 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="flex h-9 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600"
        >
          Create Message
        </button>
      </div>
    </form>
  );
}
