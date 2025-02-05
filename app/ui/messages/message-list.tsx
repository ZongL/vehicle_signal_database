export default function MessageList() {
    return (
        <div className="space-y-4">
            {/* Available Messages */}
            <div className="w-80">
                <div className="bg-white rounded-lg border p-4">
                    <div className="space-y-3">
                        {/* 这里可以先放一些示例数据，之后替换成真实数据 */}
                        <div className="p-3 bg-gray-50 rounded-lg border">
                            <div className="text-sm text-gray-500 mt-1">
                                ID: 0x123
                            </div>
                            <div className="text-sm text-gray-500">
                                Signals: 3
                            </div>
                        </div>
                    </div>
                    {/* 如果没有消息时显示的内容 */}
                    {/* <div className="text-center text-gray-500 py-4">
                        No messages available
                    </div> */}
                </div>
            </div>
        </div>
    );
}