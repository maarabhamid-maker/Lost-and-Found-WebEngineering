import { DashboardLayout } from '@/components/DashboardLayout'
import { UserCircle } from 'lucide-react'

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

export function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))
  const name = getUserName(user)

  return (
    <DashboardLayout title="Profile">
      <div className="max-w-lg rounded-xl border border-white/10 bg-white/5 p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
            <UserCircle className="w-9 h-9" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{name}</h2>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>
        </div>
        <p className="text-sm text-slate-400">
          This page is a placeholder — connect it to your profile-edit endpoint whenever it's ready.
        </p>
      </div>
    </DashboardLayout>
  )
}
