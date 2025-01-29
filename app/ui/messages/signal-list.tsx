'use client';

import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

import { Signal } from '@/app/lib/definitions';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface DragItem {
  type: string;
  signal: Signal;
}

// Signal Block Component
function SignalBlock({ signal }: { signal: Signal }) {
  const [{ isDragging }, dragRef] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: 'SIGNAL',
    item: { type: 'SIGNAL', signal },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={(dragRef as unknown) as React.RefObject<HTMLDivElement>}
      className={`p-4 mb-2 rounded-lg border ${
        isDragging ? 'opacity-50 bg-gray-100' : 'bg-white'
      } cursor-move hover:shadow-md transition-all`}
    >
      <h3 className="font-medium text-sm">{signal.name}</h3>
      <div className="text-xs text-gray-500 mt-1">
        <div>Length: {signal.length} bits</div>
        <div>Type: {signal.valuetype}</div>
      </div>
    </div>
  );
}

// Signal List Component
export default function SignalList() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allSignals, setAllSignals] = useState<Signal[]>([]);

  useEffect(() => {
    // Fetch signals from the API
    async function fetchSignals() {
      try {
        const response = await fetch('/api/signals');
        const data = await response.json();
        setAllSignals(data);
        setSignals(data);
      } catch (error) {
        console.error('Failed to fetch signals:', error);
      }
    }

    fetchSignals();
  }, []);

  // Filter signals based on search term
  useEffect(() => {
    const filteredSignals = allSignals.filter(signal =>
      signal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signal.valuetype.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signal.unit.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSignals(filteredSignals);
  }, [searchTerm, allSignals]);

  return (
    <div className="space-y-4">
      {/* Search Box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search signals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Signal List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {signals.length > 0 ? (
          signals.map((signal) => (
            <SignalBlock key={signal.id} signal={signal} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            {searchTerm ? 'No signals found' : 'Loading signals...'}
          </div>
        )}
      </div>
    </div>
  );
} 