import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import HomeScreen from './components/HomeScreen.tsx';
import RecordingView from './components/RecordingView.tsx';
import Dashboard from './components/Dashboard.tsx';
import LiveConversation from './components/LiveConversation.tsx';
import LiquidEther from './components/LiquidEther.tsx';
import type { AnalysisResult } from './types.ts';
import { getSessions, saveSession, deleteSession } from './utils/storage.ts';
// FIX: Import AnalyzeFileView to handle audio file analysis.
import AnalyzeFileView from './components/AnalyzeFileView.tsx';

// FIX: Add 'analysis' to the View type to support the new screen.
type View = 'home' | 'recording' | 'analysis' | 'live' | 'dashboard' | 'processing';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [sessions, setSessions] = useState<AnalysisResult[]>([]);
  const [activeSession, setActiveSession] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    setSessions(getSessions());
  }, []);
  
  const handleUpdateSession = (updatedSession: AnalysisResult) => {
    saveSession(updatedSession);
    const newSessions = getSessions();
    setSessions(newSessions);
    // update active session if it's the one being updated
    if (activeSession && activeSession.id === updatedSession.id) {
        setActiveSession(updatedSession);
    }
  };

  const handleDeleteSession = (id: string) => {
    deleteSession(id);
    setSessions(getSessions());
    if (activeSession?.id === id) {
      setActiveSession(null);
      setView('home');
    }
  };

  const handleAnalysisComplete = (analysisPromise: Promise<Omit<AnalysisResult, 'id' | 'date'>>) => {
    // FIX: Keep track of the original view to return to it on failure.
    const originalView = view;
    setView('processing');
    analysisPromise
      .then(analysisData => {
        const newSession: AnalysisResult = {
          ...analysisData,
          id: `session_${Date.now()}`,
          date: new Date().toISOString(),
        };
        saveSession(newSession);
        setSessions(getSessions());
        setActiveSession(newSession);
        setView('dashboard');
      })
      .catch(error => {
        console.error("Analysis failed:", error);
        alert(`Analysis failed: ${error.message}`);
        // FIX: Return to the original view (recording or analysis) on failure instead of hardcoding 'recording'.
        setView(originalView);
      });
  };

  const renderView = () => {
    switch (view) {
      case 'recording':
        return <RecordingView onAnalysisComplete={handleAnalysisComplete} onBack={() => setView('home')} />;
      // FIX: Add a case to render the AnalyzeFileView component.
      case 'analysis':
        return <AnalyzeFileView onAnalysisComplete={handleAnalysisComplete} onBack={() => setView('home')} />;
      case 'live':
        return <LiveConversation onBack={() => setView('home')} />;
      case 'dashboard':
        if (activeSession) {
          return <Dashboard analysisResult={activeSession} onBack={() => { setActiveSession(null); setView('home'); }} onUpdateSession={handleUpdateSession} />;
        }
        setView('home'); // Redirect to home if no active session
        return null; 
      case 'processing':
        return (
            <div className="flex flex-col items-center justify-center h-[85vh] text-center">
                <div className="w-16 h-16 border-t-4 border-b-4 border-cyan-400 rounded-full animate-spin mb-4"></div>
                {/* FIX: Use a more generic title for the processing screen. */}
                <h2 className="text-2xl font-bold text-cyan-400">Analyzing Your Audio...</h2>
                <p className="text-slate-400">The AI is working its magic. This might take a moment.</p>
            </div>
        );
      case 'home':
      default:
        return (
          <HomeScreen
            onStartRecording={() => setView('recording')}
            // FIX: Pass the required onStartAnalysis prop to HomeScreen.
            onStartAnalysis={() => setView('analysis')}
            onStartLive={() => setView('live')}
            onViewSession={(session) => {
              setActiveSession(session);
              setView('dashboard');
            }}
            sessions={sessions}
            onDeleteSession={handleDeleteSession}
          />
        );
    }
  };

  return (
    <main className="relative z-10 min-h-screen text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
          <ErrorBoundary fallback={<div>Something went wrong with a component. Please refresh the page.</div>}>
              <LiquidEther />
              {renderView()}
          </ErrorBoundary>
      </div>
    </main>
  );
};

export default App;
