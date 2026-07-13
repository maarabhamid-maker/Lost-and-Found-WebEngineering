import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FAQ } from '@/pages/FAQ'
import { Home } from '@/pages/Home'
import { SignUp } from '@/pages/SignUp'
import { SignIn } from '@/pages/SignIn'
import { ReportLostItem } from '@/pages/ReportLostItem'
import { ReportFoundItem } from '@/pages/ReportFoundItem'
import { Dashboard } from '@/pages/Dashboard'
import { MyItems } from '@/pages/MyItems'
import { Matches } from '@/pages/Matches'
import { Profile } from '@/pages/Profile'
import { Loader2 } from 'lucide-react'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/my-items" element={<ProtectedRoute><MyItems /></ProtectedRoute>} />
          <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
          <Route path="/report-lost" element={<ProtectedRoute><ReportLostItem /></ProtectedRoute>} />
          <Route path="/report-found" element={<ProtectedRoute><ReportFoundItem /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}