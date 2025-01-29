'use client';

import { lusitana } from '@/app/ui/fonts';
import { CreateMessage } from '@/app/ui/messages/buttons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SignalList from '@/app/ui/messages/signal-list';
import MessageEditor from '@/app/ui/messages/message-editor';

export default function Page() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Messages</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <CreateMessage />
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Left side: Signal blocks */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Available Signals</h2>
            <SignalList />
          </div>
          
          {/* Right side: Message editor */}
          <div className="md:col-span-3 bg-white p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Message Editor</h2>
            <MessageEditor />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}