import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Suggestion {
  text: string;
  confidence: number;
}

export const TextComposer = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhanceText = async () => {
    if (!text.trim()) return;

    setIsEnhancing(true);
    try {
      // TODO: Integrate with GPT-3.5 API for text enhancement
      // For now, we'll just simulate the enhancement
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEnhancedText(text.trim());
      
      // Simulate suggestions
      setSuggestions([
        { text: 'Can you help me?', confidence: 0.9 },
        { text: 'I need assistance', confidence: 0.8 },
        { text: 'Thank you for your help', confidence: 0.7 },
      ]);
    } catch (error) {
      console.error('Error enhancing text:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSend = async (platform: 'chat' | 'email' | 'sms') => {
    if (!enhancedText) return;

    try {
      // TODO: Integrate with Firebase or other backend for message sending
      console.log(`Sending message via ${platform}:`, enhancedText);
      navigate('/chat-history');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Text Composer
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Message
              </h2>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your message here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={enhanceText}
                disabled={isEnhancing || !text.trim()}
                className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isEnhancing ? 'Enhancing...' : 'Enhance Text'}
              </button>
            </div>

            {enhancedText && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Enhanced Message
                </h2>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                  {enhancedText}
                </div>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleSend('chat')}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Send as Chat
                  </button>
                  <button
                    onClick={() => handleSend('email')}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Send as Email
                  </button>
                  <button
                    onClick={() => handleSend('sms')}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Send as SMS
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Suggested Messages
            </h2>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setText(suggestion.text)}
                  className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="text-gray-900 dark:text-white">
                    {suggestion.text}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Confidence: {Math.round(suggestion.confidence * 100)}%
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 