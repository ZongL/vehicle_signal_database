'use client';

import { useState } from 'react';
import { useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { Signal, Message, MessageSignal } from '@/app/lib/definitions';

interface DragItem {
  type: string;
  signal: Signal;
}

export default function MessageEditor() {
  const [message, setMessage] = useState<Message>({
    id: '',
    name: '',
    message_id: '',
    dlc: 8,
    signals: [],
    created_at: new Date().toISOString(),
  });

  const [messageSignals, setMessageSignals] = useState<MessageSignal[]>([]);

  const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: 'SIGNAL',
    drop: (item:DragItem) => {
      console.log('Drop event triggered'); // 添加这行来确认 drop 事件是否触发
      handleSignalDrop(item.signal);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleSignalDrop = (signal: Signal) => {
    console.log('Dropped signal:', signal);
    
    const position = messageSignals.length;
    const startBit = position * 8;

    const newMessageSignal: MessageSignal = {
      message_id: message.id,
      signal_name: signal.name,
      start_bit: startBit,
      length: signal.length,
      position: position,
      name: signal.name,
    };

    console.log('New message signal:', newMessageSignal);
    
    setMessageSignals([...messageSignals, newMessageSignal]);
    setMessage({
      ...message,
      signals: [...message.signals, signal],
    });
  };

  return (
    <div className="flex gap-6">
      {/* Message Editor */}
      <div className="flex-1">
        <div
          ref={(dropRef as unknown) as React.RefObject<HTMLDivElement>}
          className={`min-h-[400px] p-4 rounded-lg border-2 border-dashed ${
            isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Message Name"
              className="w-full p-2 border rounded"
              value={message.name}
              onChange={(e) => setMessage({ ...message, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Message ID (hex)"
              className="w-full mt-2 p-2 border rounded"
              value={message.message_id}
              onChange={(e) => setMessage({ ...message, message_id: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            {message.signals.map((signal, index) => (
              <div
                key={index}
                className="p-3 bg-white rounded-lg border shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{messageSignals[index]?.name || signal.name}</span>
                  <span className="text-sm text-gray-500">
                    Start Bit: {messageSignals[index]?.start_bit}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Length: {signal.length} bits
                </div>
              </div>
            ))}
          </div>

          {message.signals.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              Drag and drop signals here to create your message
            </div>
          )}
        </div>
      </div>


    </div>
  );
} 