import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import NewsDashboard from './components/NewsDashboard.jsx'
import SignIn from './components/SignIn.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { AuthProvider } from './hooks/useAuth'
import { UnprotectedRoute } from './components/UnprotectedRoute.jsx'
import SignUp from './components/SignUp.jsx'
import LandingPage from './components/LandingPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>    
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/signin" element={<UnprotectedRoute> <SignIn /> </UnprotectedRoute>} />
            <Route path="/signup" element={<UnprotectedRoute> <SignUp /> </UnprotectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute> <NewsDashboard /> </ProtectedRoute>} />
            <Route path="/" element={<LandingPage />} />
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
