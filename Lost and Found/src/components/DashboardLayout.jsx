import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import {
  Heart,
  LayoutDashboard,
  PackageSearch,
  Sparkles,
  FilePlus,
  PackageCheck,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/my-items', label: 'My Items', icon: PackageSearch },
  { to: '/matches', label: 'Matches', icon: Sparkles },
  { to: '/report-lost', label: 'Report Lost Item', icon: FilePlus },
  { to: '/report-found', label: 'Report Found Item', icon: PackageCheck },
  { to: '/profile', label: 'Profile', icon: UserCircle },
]

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

function getUserName(user) {
  if (!user) return 'User'
  if (user.displayName) return user.displayName
  if (user.name) return user.name
  if (user.email) {
    return user.email
      .split('@')[0]
      .replace(/[._]/g, ' ')
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }
  return 'User'
}

export function DashboardLayout({ title, children }) {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()   
  const [mobileOpen, setMobileOpen] = useState(false)
  const name = getUserName(user)

  const handleSignOut = () => {
    signOut()         
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#0B1F35] flex">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64 bg-[#001A33] border-r border-white/10 flex flex-col transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
          <Link to="/" className="flex items-center gap-2 font-serif font-bold text-lg text-white">
            <Heart className="w-5 h-5 text-orange-400" />
            Lost and Found
          </Link>
          <button className="lg:hidden text-slate-400" onClick={() => setMobileOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 shrink-0">
          <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-300 font-semibold text-sm">
            {getInitials(name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white leading-tight truncate">{name}</p>
            <span className="inline-flex items-center gap-1 text-xs text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Member
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-orange-500 text-white font-medium'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 shrink-0">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-5 border-b border-white/10 bg-[#001A33]/60 shrink-0">
          <button className="lg:hidden text-slate-300" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Link to="/" className="hover:text-cyan-300">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-200">{title}</span>
          </div>
        </header>

        <div className="px-5 sm:px-8 pt-8">
          <h1 className="text-3xl font-serif font-bold text-white">{title}</h1>
        </div>

        <main className="flex-1 px-5 sm:px-8 py-6">{children}</main>

        <footer className="px-5 sm:px-8 py-4 border-t border-white/10 text-xs text-slate-500 flex justify-between shrink-0">
          <span>
            Footer <span className="text-cyan-300">Lost and Found System.</span> All rights reserved.
          </span>
          <span className="hidden sm:inline">Footer</span>
        </footer>
      </div>
    </div>
  )
}
