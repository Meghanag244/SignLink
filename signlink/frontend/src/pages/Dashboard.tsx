import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaVideo, FaKeyboard, FaBook, FaHistory, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-800 dark:to-teal-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full space-y-10 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-2xl"
      >
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Your <span className="text-blue-600 dark:text-blue-400">SignLink</span> Hub
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            Seamlessly connect and communicate with the power of AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Live Signing Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/live-signing')}
            className="flex flex-col items-center justify-center p-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 cursor-pointer aspect-square"
          >
            <FaVideo className="text-5xl mb-3" />
            <span className="text-xl font-semibold">Live Interpreting</span>
            <span className="text-sm text-blue-100 text-center mt-1">Real-time sign to text conversion.</span>
          </motion.button>

          {/* Text Composer Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/text-composer')}
            className="flex flex-col items-center justify-center p-6 bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-300 cursor-pointer aspect-square"
          >
            <FaKeyboard className="text-5xl mb-3" />
            <span className="text-xl font-semibold">Text Composer</span>
            <span className="text-sm text-purple-100 text-center mt-1">Convert text to visual signs.</span>
          </motion.button>

          {/* Phrasebook Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/phrasebook')}
            className="flex flex-col items-center justify-center p-6 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300 cursor-pointer aspect-square"
          >
            <FaBook className="text-5xl mb-3" />
            <span className="text-xl font-semibold">Phrasebook</span>
            <span className="text-sm text-yellow-100 text-center mt-1">Save and learn common phrases.</span>
          </motion.button>

          {/* Chat History Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/chat-history')}
            className="flex flex-col items-center justify-center p-6 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 cursor-pointer aspect-square"
          >
            <FaHistory className="text-5xl mb-3" />
            <span className="text-xl font-semibold">Chat History</span>
            <span className="text-sm text-green-100 text-center mt-1">Review past conversations.</span>
          </motion.button>

          {/* Settings Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/settings')}
            className="flex flex-col items-center justify-center p-6 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300 cursor-pointer aspect-square"
          >
            <FaCog className="text-5xl mb-3" />
            <span className="text-xl font-semibold">Settings</span>
            <span className="text-sm text-red-100 text-center mt-1">Customize your experience.</span>
          </motion.button>
        </div>

        {/* Optional: Add a small footer or tip */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-10">
          Need help? Visit our <Link to="/about" className="text-blue-600 dark:text-blue-400 hover:underline">About Us</Link> page.
        </p>
      </motion.div>
    </div>
  );
}; 