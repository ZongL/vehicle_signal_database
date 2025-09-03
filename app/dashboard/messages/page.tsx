'use client';

import { lusitana } from '@/app/ui/fonts';
import { CreateMessage } from '@/app/ui/messages/buttons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SignalList from '@/app/ui/messages/signal-list';
import MessageEditor from '@/app/ui/messages/message-editor';
import MessageList from '@/app/ui/messages/message-list';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Messages</h1>
        </div>
        
        {/* Instructions */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Message Management Workflow
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  1. <strong>Create Message</strong>: Click "Create Message" to define basic CAN message parameters<br/>
                  2. <strong>Configure Signals</strong>: Use the drag-and-drop interface below to assign signals to messages<br/>
                  3. <strong>Edit Messages</strong>: Click the edit icon on any message to modify signal assignments
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <CreateMessage />
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* Left side: Signal blocks */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Available Signals</h2>
            <p className="text-sm text-gray-600 mb-4">
              Drag signals to the message editor to assign them to messages
            </p>
            <SignalList />
          </div>
          
          {/* Right side: Message editor */}
          <div className="md:col-span-3 bg-white p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Message Editor</h2>
            <p className="text-sm text-gray-600 mb-4">
              Drop signals here to build CAN messages. Configure signal positions and bit assignments.
            </p>
            <MessageEditor />
          </div>
          
          {/* Available Messages */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Created Messages</h2>
            <p className="text-sm text-gray-600 mb-4">
              View and edit your created messages
            </p>
            <MessageList />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}