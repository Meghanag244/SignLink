# SignLink - Deaf-Only Smart Communication Assistant

SignLink is a fullstack AI-powered web application that enables Deaf users to communicate effectively through sign language. The application uses real-time sign language detection, text enhancement, and visual feedback to create a seamless communication experience.

## Features

- 🎥 Real-time sign language detection using TensorFlow.js
- 📝 Smart text enhancement with GPT-3.5
- 🖼️ Visual sign language rendering
- 💬 Multiple communication channels (chat, email, SMS)
- 📚 Comprehensive phrasebook
- 🧠 AI-powered message suggestions
- 🎯 Accessibility-focused design
- 🌙 Dark mode support
- 📱 Responsive design for all devices

## Tech Stack

- Frontend: React.js with TypeScript
- Styling: Tailwind CSS
- AI/ML: TensorFlow.js
- Backend: Firebase (Auth, Firestore, Functions)
- Text Enhancement: GPT-3.5 API
- State Management: React Context + Hooks

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later
- Firebase account
- OpenAI API key (for GPT-3.5 integration)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/signlink.git
   cd signlink
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
signlink/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API and service integrations
│   │   ├── utils/         # Utility functions
│   │   └── models/        # TensorFlow.js model files
│   ├── public/            # Static assets
│   └── package.json
└── README.md
```

## Accessibility Features

- High contrast mode
- Adjustable font sizes
- Keyboard navigation
- Screen reader support
- Reduced motion options
- Voice-off by default
- Visual feedback for all actions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- TensorFlow.js team for the sign language detection model
- OpenAI for GPT-3.5 API
- Firebase team for the backend infrastructure
- All contributors and supporters of the project

## Support

For support, email support@signlink.com or join our Discord community. 