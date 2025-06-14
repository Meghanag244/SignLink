import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { LiveSigning } from './pages/LiveSigning';
import { TextComposer } from './pages/TextComposer';
import { SignRenderer } from './pages/SignRenderer';
import { ChatHistory } from './pages/ChatHistory';
import { Phrasebook } from './pages/Phrasebook';
import { Settings } from './pages/Settings';
import { AboutUs } from './pages/AboutUs';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/live-signing" element={<LiveSigning />} />
          <Route path="/text-composer" element={<TextComposer />} />
          <Route path="/sign-renderer" element={<SignRenderer />} />
          <Route path="/chat-history" element={<ChatHistory />} />
          <Route path="/phrasebook" element={<Phrasebook />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
