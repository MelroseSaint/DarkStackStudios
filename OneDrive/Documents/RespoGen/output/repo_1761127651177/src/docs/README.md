# DealMentor AI

## 🚀 Overview

DealMentor AI is an advanced, web-based intelligence platform designed to help professionals hone their communication skills. By leveraging the power of Google's Gemini API, this application provides in-depth analysis of pitches, real-time conversational practice with an AI business expert, and actionable feedback to drive improvement.

All session data is stored locally in the browser, ensuring user privacy and eliminating the need for accounts or sign-ins.

---

## ✨ Key Features

-   **Record & Analyze**: Use the in-browser recording studio to capture your pitch, then receive a comprehensive analysis.
-   **Analyze Existing Audio**: Upload pre-recorded audio files (MP3, WAV, M4A, etc.) of your sales pitches or business calls to get the same detailed analysis.
-   **Live Q&A with AI Advisor**: Engage in a real-time, voice-based conversation with an AI business expert. Ask any question about startups, non-profits, finance, or strategy and get instant answers.
-   **In-depth Analysis Dashboard**:
    -   **Sentiment & Engagement Graph**: Visualize the emotional tone and engagement level of the pitch over time.
    -   **AI-Powered Coaching Card**: Receive personalized feedback highlighting strengths and identifying areas for improvement.
    -   **In-Line Transcript Highlights**: See specific lines in the transcript that the AI has flagged for comment, with notes on hover.
    -   **AI Audio Feedback**: Listen to the AI speak its coaching advice for a more immersive review experience.
-   **Persistent Session History**: Save your analysis sessions directly in your browser. Review past performances, track your progress, and identify trends.
-   **Comprehensive Data Export**: Download individual sessions as a `.zip` file containing a `.wav` of the AI audio feedback and a professional `.txt` analysis report. You can also download all sessions at once for a complete backup.

---

## 🛠️ Technologies Used

-   **Frontend**:
    -   **React**: For building the user interface.
    -   **TypeScript**: For static typing and improved code quality.
    -   **Tailwind CSS**: For rapid, utility-first styling.
-   **AI & API**:
    -   **Google Gemini API**:
        -   `gemini-2.5-flash`: Used for fast audio transcription.
        -   `gemini-2.5-pro`: Powers the in-depth analysis for sentiment, highlights, and coaching tips.
        -   `gemini-2.5-flash-native-audio-preview-09-2025`: Enables real-time, low-latency audio conversations for the Live Q&A feature.
        -   `gemini-2.5-flash-preview-tts`: Used to generate the AI's audio feedback.
-   **Data Visualization**:
    -   **Recharts**: For creating the interactive Sentiment & Engagement Graph.
-   **Client-Side Libraries**:
    -   **JSZip**: For creating `.zip` file archives directly in the browser.
    -   **Babel Standalone**: For in-browser transpilation of TSX.
-   **Client-Side Storage**:
    -   **Browser Local Storage**: To save and manage all session data persistently on the user's machine.

---

## 📖 How to Use the App

The application is structured around three core workflows, all accessible from the home screen.

### 1. Review Past Sessions (Right Panel)

-   When you first open the app, the right-hand panel will show a list of your previously saved sessions.
-   Click on a session to open its detailed analysis dashboard.
-   Hover over a session and click the trash icon to delete it from your history.

### 2. Record & Analyze

-   From the home screen, click **Record & Analyze**.
-   Use the controls in the Recording Studio to start and stop your recording.
-   Once finished, you can download the raw `.wav` file or click **Analyze Now**.
-   The app will process your recording and present the full analysis dashboard.
-   From the dashboard, you can save the session, listen to audio feedback, or download a complete `.zip` report.

### 3. Analyze Audio File

-   From the home screen, click **Analyze Audio File**.
-   Drag and drop an audio file (e.g., MP3, WAV, M4A) or click to select one from your device.
-   Click **Analyze** to begin processing.
-   The app will transcribe and analyze the file, then present the full analysis dashboard.

### 4. Live Q&A with AI Advisor

-   From the home screen, click **Live Q&A with AI Advisor**.
-   Click **Start Session** and grant your browser permission to use your microphone.
-   The AI advisor will greet you. Ask any business-related question, and the AI will respond in real-time.
-   The conversation is transcribed live on screen.
-   When you're finished, click **Stop Session**. You will be returned to the home screen.

---

## 📂 Project Structure

The project is organized into a modular structure to keep the code clean and maintainable.

```
/
├── public/
│   └── favicon.svg         # Application icon
├── components/             # Reusable React components
│   ├── App.tsx             # Main application component and view router
│   └── ...                 # Other UI components (Dashboard, HomeScreen, etc.)
├── services/
│   └── geminiService.ts    # All logic for interacting with the Gemini API
├── utils/
│   ├── audio.ts            # Helper functions for audio encoding/decoding
│   └── storage.ts          # Functions for managing localStorage
├── types.ts                # TypeScript type definitions for the app
├── index.html              # The main HTML file with entry script
├── index.tsx               # The React entry point
├── metadata.json           # Application metadata
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies and metadata
├── .gitignore              # Git ignore file
└── README.md               # This file
```