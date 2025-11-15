import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { CrisisProvider } from './contexts/CrisisContext';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import CrisisSupportPage from './pages/CrisisSupportPage';
import AssessmentPage from './pages/AssessmentPage';
import ProfessionalDirectoryPage from './pages/ProfessionalDirectoryPage';
import CommunityPage from './pages/CommunityPage';
import EducationPage from './pages/EducationPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CrisisProvider>
        <Router>
          <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="crisis-support" element={<CrisisSupportPage />} />
                <Route path="assessment" element={<AssessmentPage />} />
                <Route path="professionals" element={<ProfessionalDirectoryPage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="education" element={<EducationPage />} />
                <Route path="mood-tracker" element={<MoodTrackerPage />} />
                <Route path="resources" element={<ResourcesPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </CrisisProvider>
    </AuthProvider>
  );
}

export default App;