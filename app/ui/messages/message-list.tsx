'use client';

import { useEffect, useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function MessageList() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await fetch('/api/messages');
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchMessages();
    }, []);

    const handleEditMessage = (messageId: string) => {
        // For now, just log - you can implement edit functionality later
        console.log('Edit message:', messageId);
        alert('Signal mapping functionality will be implemented here!');
    };

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="w-80">
                    <div className="bg-white rounded-lg border p-4">
                        <div className="text-center text-gray-500 py-4">
                            Loading messages...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="w-80">
                <div className="bg-white rounded-lg border p-4">
                    <div className="space-y-3">
                        {messages.length > 0 ? (
                            messages.map((message) => (
                                <div key={message.id} className="p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="font-medium text-sm text-gray-900">
                                                {message.name}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                ID: {message.message_id}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Signals: {message.signal_count || 0}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                DLC: {message.dlc} bytes
                                            </div>
                                            {message.cycle_time && (
                                                <div className="text-sm text-gray-500">
                                                    Cycle: {message.cycle_time}ms
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleEditMessage(message.id)}
                                            className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                            title="Edit signals"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-4">
                                <p>No messages available</p>
                                <p className="text-xs mt-1">Create your first message to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}