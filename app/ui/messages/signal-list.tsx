'use client';

import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Signal } from '@/app/lib/definitions';

// Signal Block Component
function SignalBlock({ signal }: { signal: Signal }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SIGNAL',
    item: signal,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
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

  useEffect(() => {
    // Fetch signals from the API
    async function fetchSignals() {
      try {
        const response = await fetch('/api/signals');
        const data = await response.json();
        setSignals(data);
      } catch (error) {
        console.error('Failed to fetch signals:', error);
      }
    }

    fetchSignals();
  }, []);

  return (
    <div className="space-y-2">
      {signals.map((signal) => (
            <SignalBlock key={signal.id} signal={signal} />
      ))}
    </div>
  );
} 