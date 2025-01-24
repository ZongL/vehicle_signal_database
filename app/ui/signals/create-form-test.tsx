'use client';
// app/ui/signals/create-form.tsx
import { useState } from 'react';
import Link from 'next/link';

type Signal = {
  name: string;
  length: number;
  byteorder: string;
  valuetype: string;
  initialvalue: number;
  factor: number;
  sigoffset: number;
  minivalue: number;
  maxvalue: number;
  unit: string;
};

type CreateFormProps = {
  customers: any[]; // Adjust the type as needed
};

export default function CreateForm({ customers }: CreateFormProps) {
  const [signal, setSignal] = useState<Signal>({
    name: '',
    length: 0,
    byteorder: '',
    valuetype: '',
    initialvalue: 0,
    factor: 0.0,
    sigoffset: 0.0,
    minivalue: 0,
    maxvalue: 0,
    unit: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignal((prevSignal) => ({
      ...prevSignal,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/seed/createsignals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signal),
      });

      if (response.ok) {
        alert('Signal created successfully!');
        // Redirect to another page or refresh the form
      } else {
        alert('Failed to create signal.');
      }
    } catch (error) {
      console.error('Error creating signal:', error);
      alert('Error creating signal.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={signal.name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Length</label>
        <input
          type="number"
          name="length"
          value={signal.length}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Byte Order</label>
        <input
          type="text"
          name="byteorder"
          value={signal.byteorder}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Value Type</label>
        <input
          type="text"
          name="valuetype"
          value={signal.valuetype}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Initial Value</label>
        <input
          type="number"
          name="initialvalue"
          value={signal.initialvalue}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Factor</label>
        <input
          type="number"
          step="0.001"
          name="factor"
          value={signal.factor}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Sig Offset</label>
        <input
          type="number"
          step="0.001"
          name="sigoffset"
          value={signal.sigoffset}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Min Value</label>
        <input
          type="number"
          name="minivalue"
          value={signal.minivalue}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Max Value</label>
        <input
          type="number"
          name="maxvalue"
          value={signal.maxvalue}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Unit</label>
        <input
          type="text"
          name="unit"
          value={signal.unit}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <Link
          href="/dashboard/signals"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Create
      </button>
      </div>
    </form>
  );
}