import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Settings {
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark' | 'system';
  contrast: 'normal' | 'high';
  animations: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
}

export const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings>({
    fontSize: 'medium',
    theme: 'system',
    contrast: 'normal',
    animations: true,
    soundEffects: false,
    hapticFeedback: true,
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('signlink-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('signlink-settings', JSON.stringify(newSettings));

    // Apply theme changes immediately
    if (key === 'theme') {
      document.documentElement.classList.remove('light', 'dark');
      if (value === 'dark' || (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.add('light');
      }
    }

    // Apply font size changes
    if (key === 'fontSize') {
      const sizes: Record<Settings['fontSize'], string> = {
        small: '14px',
        medium: '16px',
        large: '18px',
      };
      document.documentElement.style.fontSize = sizes[value as Settings['fontSize']];
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to Home
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Font Size */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Font Size
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSettingChange('fontSize', size)}
                    className={`p-4 rounded-lg ${
                      settings.fontSize === size
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Theme
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {(['light', 'dark', 'system'] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleSettingChange('theme', theme)}
                    className={`p-4 rounded-lg ${
                      settings.theme === theme
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Contrast */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contrast
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {(['normal', 'high'] as const).map((contrast) => (
                  <button
                    key={contrast}
                    onClick={() => handleSettingChange('contrast', contrast)}
                    className={`p-4 rounded-lg ${
                      settings.contrast === contrast
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {contrast.charAt(0).toUpperCase() + contrast.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Other Settings */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Other Settings
              </h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.animations}
                    onChange={(e) => handleSettingChange('animations', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-900 dark:text-white">
                    Enable Animations
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.soundEffects}
                    onChange={(e) => handleSettingChange('soundEffects', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-900 dark:text-white">
                    Sound Effects
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.hapticFeedback}
                    onChange={(e) => handleSettingChange('hapticFeedback', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-900 dark:text-white">
                    Haptic Feedback
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 