import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import NewsDashboard from './components/NewsDashboard.jsx'
import SignIn from './components/SignIn.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { AuthProvider } from './hooks/useAuth'
import { UnprotectedRoute } from './components/UnprotectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>    
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/signIn" element={<UnprotectedRoute> <SignIn /> </UnprotectedRoute>} />
            {/* <Route path="/signUp" element={<SignUp />} /> */}
            <Route path="/home" element={ <ProtectedRoute> <NewsDashboard /> </ProtectedRoute> } />
        </Routes>
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
