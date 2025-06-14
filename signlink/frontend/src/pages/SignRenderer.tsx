import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignAnimation {
  letter: string;
  gifUrl: string;
}

export const SignRenderer = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [animations, setAnimations] = useState<SignAnimation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (text) {
      convertToSigns(text);
    }
  }, [text]);

  const convertToSigns = async (inputText: string) => {
    setIsLoading(true);
    try {
      // TODO: Integrate with backend API for text-to-sign conversion
      // For now, we'll simulate the conversion with placeholder GIFs
      const letters = inputText.toUpperCase().split('');
      const newAnimations = letters.map(letter => ({
        letter,
        gifUrl: `/signs/${letter}.gif` // Placeholder path
      }));
      setAnimations(newAnimations);
    } catch (error) {
      console.error('Error converting text to signs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sign Language Renderer
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Enter Text
            </h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type the text you want to convert to sign language..."
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Sign Language Animation
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-600 dark:text-gray-300">
                  Converting to sign language...
                </div>
              </div>
            ) : animations.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {animations.map((animation, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {animation.letter}
                    </div>
                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      {/* TODO: Replace with actual sign language GIF */}
                      <span className="text-4xl">👋</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-600 dark:text-gray-300">
                  Enter text to see sign language animation
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Phrases
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Hello', 'Thank you', 'Help', 'Goodbye'].map((phrase) => (
              <button
                key={phrase}
                onClick={() => setText(phrase)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 