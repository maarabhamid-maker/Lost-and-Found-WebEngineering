import { Link } from 'react-router-dom'
import { DashboardLayout } from '@/components/DashboardLayout'
import { useDashboardData } from '@/hooks/useDashboardData'
import { Layers, Briefcase, PackageCheck, Sparkles, ArrowRight, Loader2 } from 'lucide-react'

function StatCard({ icon: Icon, value, label, to, gradient }) {
  return (
    <Link
      to={to}
      className={`group rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all ${gradient}`}
    >
      <div className="p-6 flex items-start justify-between">
        <div>
          <div className="text-4xl font-bold text-white">{value}</div>
          <p className="text-sm text-white/85 mt-1">{label}</p>
        </div>
        <Icon className="w-10 h-10 text-white/30" />
      </div>
      <div className="px-6 py-3 bg-black/15 flex items-center justify-between text-sm text-white/90">
        More info
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}

export function Dashboard() {
  const { items, matches, loading } = useDashboardData()

  const lostCount = items.filter((i) => i.type === 'lost').length
  const foundCount = items.filter((i) => i.type === 'found').length

  return (
    <DashboardLayout title="Dashboard">
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-7 h-7 animate-spin text-cyan-300" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            icon={Layers}
            value={items.length}
            label="Total Items"
            to="/my-items"
            gradient="bg-gradient-to-br from-cyan-500 to-cyan-700"
          />
          <StatCard
            icon={Briefcase}
            value={lostCount}
            label="Lost Items"
            to="/my-items"
            gradient="bg-gradient-to-br from-orange-500 to-orange-700"
          />
          <StatCard
            icon={PackageCheck}
            value={foundCount}
            label="Found Items"
            to="/my-items"
            gradient="bg-gradient-to-br from-teal-500 to-teal-700"
          />
          <StatCard
            icon={Sparkles}
            value={matches.length}
            label="Active Matches"
            to="/matches"
            gradient="bg-gradient-to-br from-orange-600 to-cyan-700"
          />
        </div>
      )}
    </DashboardLayout>
  )
}
