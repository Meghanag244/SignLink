import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  platform: 'chat' | 'email' | 'sms';
  status: 'sent' | 'delivered' | 'read';
}

export const ChatHistory = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      // TODO: Integrate with Firebase or other backend to load messages
      // For now, we'll use sample data
      const sampleMessages: Message[] = [
        {
          id: '1',
          text: 'Hello, I need help with my order.',
          timestamp: new Date('2024-03-15T10:30:00'),
          platform: 'chat',
          status: 'read',
        },
        {
          id: '2',
          text: 'Thank you for your assistance.',
          timestamp: new Date('2024-03-15T11:45:00'),
          platform: 'email',
          status: 'delivered',
        },
        {
          id: '3',
          text: 'Can you call me back?',
          timestamp: new Date('2024-03-15T14:20:00'),
          platform: 'sms',
          status: 'sent',
        },
      ];
      setMessages(sampleMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'chat':
        return '💬';
      case 'email':
        return '📧';
      case 'sms':
        return '📱';
      default:
        return '📝';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'read':
        return 'text-green-600';
      case 'delivered':
        return 'text-blue-600';
      case 'sent':
        return 'text-gray-600';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Message History
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Home
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-xl text-gray-600 dark:text-gray-300">
                Loading messages...
              </div>
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {getPlatformIcon(message.platform)}
                      </span>
                      <div>
                        <p className="text-gray-900 dark:text-white">
                          {message.text}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {message.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium ${getStatusColor(
                        message.status
                      )}`}
                    >
                      {message.status.charAt(0).toUpperCase() +
                        message.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-xl text-gray-600 dark:text-gray-300">
                No messages yet
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => navigate('/text-composer')}
            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            New Message
          </button>
          <button
            onClick={() => navigate('/sign-renderer')}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Signs
          </button>
        </div>
      </div>
    </div>
  );
}; 