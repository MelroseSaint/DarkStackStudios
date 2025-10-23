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

## 🚀 Getting Started

To run this application locally, you'll need a Google Gemini API key.

### Prerequisites

-   A modern web browser that supports the Web Audio API (Chrome, Firefox, Edge, Safari).
-   A Google Gemini API Key. You can get one from Google AI Studio.

### Local Setup

1.  **API Key Configuration**: The application is designed to retrieve the API key from the environment variable `process.env.API_KEY`. When running in a development environment that supports this (like a project bootstrapped with Vite or Create React App), you would typically create a `.env` file in the root of your project and add your key:
    ```
    API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
    **Note**: For this specific project setup, the API key is expected to be injected into the environment by the hosting platform.

2.  **Running the Application**: Because this project uses JSX and ES modules directly in the browser via Babel's standalone transpiler, you need to serve the project files from a local web server. Simply opening `index.html` from your file system will not work due to browser security restrictions (CORS).

    A simple way to do this is with the `serve` package:
    ```bash
    # If you don't have 'serve', install it globally
    npm install -g serve

    # From the project's root directory, run:
    serve .
    ```
    This will start a server, and you can access the application at the URL it provides (e.g., `http://localhost:3000`).

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

The project follows a component-based architecture for modularity and maintainability.

```
/
├── public/
│   └── favicon.svg         # Application icon
├── components/             # Reusable React components
│   ├── App.tsx             # Main application component and view router
│   ├── HomeScreen.tsx      # The main landing page with core actions
│   ├── RecordingView.tsx   # UI for recording audio from the microphone
│   ├── AnalyzeFileView.tsx # UI for uploading and analyzing audio files
│   ├── LiveConversation.tsx# Real-time Q&A session with the AI advisor
│   ├── Dashboard.tsx       # Displays the full analysis results for a session
│   ├── CoachingCard.tsx    # Component for displaying AI coaching tips
│   ├── SentimentChart.tsx  # Renders the sentiment & engagement graph
│   ├── TranscriptView.tsx  # Displays the color-coded call transcript
│   ├── Navigation.tsx      # Sidebar component for session history
│   ├── LiquidEther.tsx     # Animated background effect
│   └── icons.tsx           # SVG icon components
├── services/
│   └── geminiService.ts    # All logic for interacting with the Google Gemini API
├── utils/
│   ├── audio.ts            # Helper functions for audio encoding/decoding
│   └── storage.ts          # Functions for managing session data in localStorage
├── types.ts                # TypeScript type definitions for the application
├── index.html              # The main HTML file and script entry point
├── index.tsx               # The React root component renderer
├── metadata.json           # Application metadata
└── README.md               # This file
```