import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import UserProvider from './contexts/UserContext'
import PreferredDurationProvider from './pages/Timer/providers/PreferredDurationProvider'
import {
  About,
  Achievements,
  Discussions,
  Home,
  Login,
  Stats,
  StudyRooms,
  TimerPage
} from './pages'
import NotFound from './pages/NotFound'
import Timer from './pages/Timer'

dayjs.extend(duration)

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<Login />} path="/login" />

        {/* Protected Routes (only be shown after login) */}
        <Route
          element={
            <ProtectedRoute>
             <PreferredDurationProvider>
                <Layout />
              </PreferredDurationProvider>
            </ProtectedRoute>
          }
          path="/"
        >
          {/*Index Route*/}
          <Route index element={<Home />} />

          {/* All other pages */}
          <Route element={<TimerPage />} path="timer" />
          <Route element={<StudyRooms />} path="study-rooms" />
          <Route element={<About />} path="about" />
          <Route element={<Discussions />} path="discussions" />
          <Route element={<Stats />} path="stats" />
          <Route element={<Achievements />} path="achievements" />
          <Route element={<Timer />} path="timer" />
          <Route element={<NotFound />} path="*" />
        </Route>
      </Routes>
    </UserProvider>
  )
}

export default App
