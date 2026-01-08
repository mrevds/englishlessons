import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import LessonsList from './components/LessonsList';
import LessonPage from './pages/LessonPage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import TeacherDashboard from './pages/TeacherDashboard';
import LeaderboardPage from './pages/LeaderboardPage';
import GamesPage from './pages/GamesPage';
import GrammarDetective from './pages/games/GrammarDetective';
import SentenceBuilder from './pages/games/SentenceBuilder';
import MemoryCards from './pages/games/MemoryCards';
import FillGapRace from './pages/games/FillGapRace';
import QuizShow from './pages/games/QuizShow';
import GameLeaderboard from './pages/games/GameLeaderboard';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl">⏳</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const NavigateToRole: React.FC = () => {
  const { user } = useAuth();
  
  if (user?.role === 'teacher') {
    return <Navigate to="/dashboard" />;
  }
  
  return <Navigate to="/lessons" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/lessons"
            element={
              <PrivateRoute>
                <LessonsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/lesson/:id"
            element={
              <PrivateRoute>
                <LessonPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/games"
            element={
              <PrivateRoute>
                <GamesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/games/grammar-detective"
            element={
              <PrivateRoute>
                <GrammarDetective />
              </PrivateRoute>
            }
          />
          <Route
            path="/games/sentence-builder"
            element={
              <PrivateRoute>
                <SentenceBuilder />
              </PrivateRoute>
            }
          />
          <Route
            path="/games/memory-cards"
            element={
              <PrivateRoute>
                <MemoryCards />
              </PrivateRoute>
            }
          />
          <Route
            path="/games/fill-gap-race"
            element={
              <PrivateRoute>
                <FillGapRace />
              </PrivateRoute>
            }
          />
          <Route
            path="/games/quiz-show"
            element={
              <PrivateRoute>
                <QuizShow />
              </PrivateRoute>
            }
          />
          <Route
            path="/games/leaderboard"
            element={
              <PrivateRoute>
                <GameLeaderboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/stats"
            element={
              <PrivateRoute>
                <StatsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <TeacherDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <LeaderboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <NavigateToRole />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
