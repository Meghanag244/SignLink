import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Phrase {
  id: string;
  text: string;
  category: string;
  icon: string;
}

const categories = [
  { id: 'greetings', name: 'Greetings', icon: '👋' },
  { id: 'needs', name: 'Basic Needs', icon: '🆘' },
  { id: 'medical', name: 'Medical', icon: '🏥' },
  { id: 'travel', name: 'Travel', icon: '✈️' },
  { id: 'food', name: 'Food & Drink', icon: '🍽️' },
  { id: 'emergency', name: 'Emergency', icon: '🚨' },
];

const phrases: Phrase[] = [
  // Greetings
  { id: 'g1', text: 'Hello, how are you?', category: 'greetings', icon: '👋' },
  { id: 'g2', text: 'Thank you for your help', category: 'greetings', icon: '🙏' },
  { id: 'g3', text: 'Good morning', category: 'greetings', icon: '🌅' },
  { id: 'g4', text: 'Good night', category: 'greetings', icon: '🌙' },

  // Basic Needs
  { id: 'n1', text: 'I need help', category: 'needs', icon: '🆘' },
  { id: 'n2', text: 'Where is the bathroom?', category: 'needs', icon: '🚻' },
  { id: 'n3', text: 'I am lost', category: 'needs', icon: '🧭' },
  { id: 'n4', text: 'Can you understand me?', category: 'needs', icon: '❓' },

  // Medical
  { id: 'm1', text: 'I need a doctor', category: 'medical', icon: '👨‍⚕️' },
  { id: 'm2', text: 'I am in pain', category: 'medical', icon: '😣' },
  { id: 'm3', text: 'I am allergic to...', category: 'medical', icon: '⚠️' },
  { id: 'm4', text: 'I need medicine', category: 'medical', icon: '💊' },

  // Travel
  { id: 't1', text: 'Where is the bus stop?', category: 'travel', icon: '🚌' },
  { id: 't2', text: 'I need a taxi', category: 'travel', icon: '🚕' },
  { id: 't3', text: 'How do I get to...', category: 'travel', icon: '🗺️' },
  { id: 't4', text: 'I am lost', category: 'travel', icon: '🧭' },

  // Food & Drink
  { id: 'f1', text: 'I am hungry', category: 'food', icon: '🍽️' },
  { id: 'f2', text: 'I am thirsty', category: 'food', icon: '🥤' },
  { id: 'f3', text: 'I am allergic to...', category: 'food', icon: '⚠️' },
  { id: 'f4', text: 'Where can I eat?', category: 'food', icon: '🍴' },

  // Emergency
  { id: 'e1', text: 'Call 911', category: 'emergency', icon: '🚨' },
  { id: 'e2', text: 'I need help immediately', category: 'emergency', icon: '🆘' },
  { id: 'e3', text: 'There is an emergency', category: 'emergency', icon: '⚠️' },
  { id: 'e4', text: 'I am in danger', category: 'emergency', icon: '🚨' },
];

export const Phrasebook = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('greetings');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPhrases = phrases.filter(
    (phrase) =>
      phrase.category === selectedCategory &&
      phrase.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePhraseSelect = (phrase: Phrase) => {
    navigate('/text-composer', { state: { initialText: phrase.text } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Phrasebook
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Home
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search phrases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPhrases.map((phrase) => (
              <button
                key={phrase.id}
                onClick={() => handlePhraseSelect(phrase)}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{phrase.icon}</span>
                  <span className="text-gray-900 dark:text-white">
                    {phrase.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 