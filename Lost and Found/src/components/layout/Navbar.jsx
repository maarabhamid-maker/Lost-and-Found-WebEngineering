import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Navbar() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-[#001A33] text-white border-b border-slate-700">
      <div className="max-w-full px-16 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif font-bold text-2xl text-white">
          <Heart className="w-6 h-6" />
          University Lost and Found
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="text-white">Dashboard</Button>
              </Link>
              <Link to="/report">
                <Button className="bg-white text-[#001A33]">Report Item</Button>
              </Link>
              <div className="text-sm text-slate-200">
                {user?.email}
              </div>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white border-transparent"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
