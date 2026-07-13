import { Link, useNavigate } from 'react-router-dom'
import { Backpack, Search, Bell, Shield, Heart, ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export function Home() {
  const navigate = useNavigate()
  const { isAuthenticated, loginTestUser } = useAuth()
  const reportTarget = isAuthenticated ? '/report' : '/login'

  const handleTestLogin = () => {
    loginTestUser()
    navigate('/dashboard')
  }

  const steps = [
    { icon: Heart, title: 'Report', copy: "Tell us what's missing, or what you just found." },
    { icon: Search, title: 'Match', copy: 'We compare it against everything already reported.' },
    { icon: Bell, title: 'Notify', copy: "You'll hear about it the moment a match looks right." },
    { icon: Shield, title: 'Reunite', copy: 'Verified messaging keeps the handoff safe.' },
  ]

  return (
    <div className="min-h-screen bg-[#001A33] text-white flex flex-col">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[url('/uni.jpg')] bg-cover bg-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 15% 20%, rgba(249,115,22,0.18), transparent 45%), radial-gradient(circle at 85% 15%, rgba(34,211,238,0.18), transparent 45%), rgba(0,26,51,0.88)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 min-h-[85vh]">
          <div className="max-w-2xl">
            <h1 className="font-sans text-7xl sm:text-8xl font-black leading-[0.9] tracking-tight mb-6">
              Find &amp;
              <br />
              Recover
              <br />
              <span className="text-cyan-300">With Ease</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base font-normal max-w-md mb-10">
              Report a lost item or hand in something you found — our campus
              community does the rest.
            </p>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
              >
                View your dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleTestLogin}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition"
                >
                  Quick test login
                </button>
                <p className="text-xs text-slate-300">
                  Test account: <span className="font-semibold">test@gmail.com</span> / <span className="font-semibold">Test@12345</span>
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 w-full lg:w-[420px] shrink-0">
            <Link
              to={reportTarget}
              className="group flex items-center justify-between pl-10 pr-3 py-4 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors shadow-xl shadow-orange-500/30"
            >
              <span className="font-semibold text-2xl">Lost</span>
              <span className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <Backpack className="w-7 h-7" />
              </span>
            </Link>

            <Link
              to={reportTarget}
              className="group flex items-center justify-between pl-10 pr-3 py-4 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-colors shadow-xl shadow-cyan-500/30"
            >
              <span className="font-semibold text-2xl text-[#001A33]">Found</span>
              <span className="w-16 h-16 rounded-full bg-[#001A33]/15 flex items-center justify-center group-hover:bg-[#001A33]/25 transition-colors">
                <Search className="w-7 h-7 text-[#001A33]" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-24 bg-[#001A33]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase">
              The process
            </span>
            <h2 className="font-serif text-4xl font-bold mt-3">How it works</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isOrange = i % 2 === 0
              return (
                <div
                  key={step.title}
                  className="rounded-3xl bg-white/[0.04] border border-white/10 p-7 hover:bg-white/[0.06] transition-colors"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${
                      isOrange ? 'bg-orange-500/20' : 'bg-cyan-500/20'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isOrange ? 'text-orange-400' : 'text-cyan-300'}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.copy}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-orange-500/10 via-white/[0.03] to-cyan-500/10 border border-white/10 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              { value: '2,500+', label: 'Items posted' },
              { value: '1,800+', label: 'Successfully matched' },
              { value: '72%', label: 'Recovery rate' },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-10">
                <div className="text-4xl font-serif font-bold bg-gradient-to-r from-orange-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-400 text-sm tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold mb-5">Ready to find your items?</h2>
          <p className="text-lg text-slate-300 mb-9">
            Join thousands of students and staff who've already gotten their belongings back.
          </p>

          {!isAuthenticated && (
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-gradient-to-r from-orange-500 to-cyan-500 hover:opacity-90 transition-opacity font-semibold"
            >
              Create your free account <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
