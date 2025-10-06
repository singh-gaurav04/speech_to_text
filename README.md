# 🎤 Speech-to-Text Application

A modern, voice-controlled speech-to-text application built with React and the Web Speech API. This application provides real-time transcription with a beautiful, responsive UI and hands-free operation.

![Speech-to-Text App](https://img.shields.io/badge/React-19.1.1-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC) ![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF)

## ✨ Features

- 🎯 **Voice-Controlled**: Say "hi" to start, "bye" to stop
- ⚡ **Real-time Transcription**: Live speech-to-text conversion
- 🎨 **Modern UI**: Beautiful glassmorphism design with Tailwind CSS
- 📱 **Responsive**: Works perfectly on desktop and mobile
- 📋 **Copy to Clipboard**: One-click text copying with visual feedback
- 🔄 **Always Listening**: Continuously monitors for voice commands
- 🎭 **Lucide Icons**: Clean, modern iconography

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Modern web browser with Web Speech API support
- Microphone access

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd speech-to-text
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 How to Use

1. **Allow microphone access** when prompted
2. **Say "hi"** to start transcribing
3. **Speak normally** - your words will appear in real-time
4. **Say "bye"** to stop transcribing
5. **Click "Copy Text"** to copy the transcribed text

### Voice Commands

| Command | Action |
|---------|--------|
| "hi" or "start" | Begin transcription |
| "bye" or "stop" | End transcription |

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.14
- **Icons**: Lucide React
- **Speech Recognition**: Web Speech API via react-speech-recognition
- **Language**: JavaScript (ES6+)

## 📁 Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # Application entry point
├── index.css        # Global styles
└── components/      # Reusable components (if any)
```

## 🎨 UI Features

- **Glassmorphism Design**: Modern frosted glass effect
- **Gradient Backgrounds**: Beautiful color transitions
- **Status Indicators**: Real-time listening/transcribing status
- **Smooth Animations**: CSS transitions and hover effects
- **Responsive Layout**: Adapts to all screen sizes

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 Browser Compatibility

- ✅ Chrome/Chromium (Recommended)
- ✅ Edge
- ✅ Safari (Limited support)
- ❌ Firefox (No Web Speech API support)

## 🎯 Use Cases

- **Note-taking**: Quick transcription during meetings or lectures
- **Accessibility**: Voice input for users with mobility issues
- **Content Creation**: Dictation for articles, emails, or documents
- **Language Learning**: Practice pronunciation and transcription
- **Hands-free Computing**: Voice control for various applications

## 🚧 Future Enhancements

- [ ] Multiple language support
- [ ] Export to different formats (PDF, DOCX)
- [ ] Voice command customization
- [ ] Offline mode with local processing
- [ ] Text editing and formatting
- [ ] Integration with cloud services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gaurav Singh**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for speech recognition
- [react-speech-recognition](https://github.com/JamesBrill/react-speech-recognition) for React integration
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons

---

⭐ **Star this repository if you found it helpful!**