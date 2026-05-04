import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Search, Bell, Shield } from 'lucide-react'

export function Home() {
  // Check if a user is logged in by reading from localStorage
  const user = JSON.parse(localStorage.getItem('user'))
  const isAuthenticated = !!user

  return (
    <div className="min-h-screen bg-[#001A33] text-white flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[url('/uni.jpg')] bg-cover bg-center text-white border-b border-slate-700 py-20">
        <div className="absolute inset-0 bg-[#001A33]/85" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4 text-cyan-300" />
            <span className="text-sm font-medium text-slate-200">Reconnecting Lost with Found</span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-white">
            Find Your Lost Items
          </h1>

          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Report lost items and get matched with found items in real-time. Our community helps reunite people with their belongings.
          </p>

          <div className="flex justify-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/report">
                  <Button size="lg" className="text-lg h-12">
                    Report an Item
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" className="text-lg h-12 bg-orange-500 hover:bg-orange-500 text-white border-transparent">
                    View Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="lg" className="text-lg h-12 bg-orange-500 hover:bg-orange-500 text-white">
                    Report an Item
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#001A33]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-12 text-white">How It Works</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-[#003d5c] border-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-orange-400 cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-orange-500/40">
                  <Heart className="w-6 h-6 text-orange-400 transition-transform duration-300 hover:scale-110" />
                </div>
                <CardTitle className="text-white">Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Report lost or found items with photos, location, and details
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#003d5c] border-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-cyan-400 cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-cyan-500/40">
                  <Search className="w-6 h-6 text-cyan-400 transition-transform duration-300 hover:scale-110" />
                </div>
                <CardTitle className="text-white">Match</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Our system automatically matches lost and found items
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#003d5c] border-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-orange-400 cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-orange-500/40">
                  <Bell className="w-6 h-6 text-orange-400 transition-transform duration-300 hover:scale-110" />
                </div>
                <CardTitle className="text-white">Notify</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Get real-time notifications when potential matches are found
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#003d5c] border-slate-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-cyan-400 cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-cyan-500/40">
                  <Shield className="w-6 h-6 text-cyan-400 transition-transform duration-300 hover:scale-110" />
                </div>
                <CardTitle className="text-white">Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Safe, verified communication between owners and finders
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#000d1f] border-y border-slate-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">2,500+</div>
              <p className="text-slate-300">Items Posted</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">1,800+</div>
              <p className="text-slate-300">Successfully Matched</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">72%</div>
              <p className="text-slate-300">Recovery Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#001A33] flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-white">Ready to Find Your Items?</h2>
          <p className="text-lg text-slate-300 mb-8">
            Join thousands of people who have successfully recovered their lost items through our platform.
          </p>

          {!isAuthenticated && (
            <Link to="/signup">
              <Button size="lg" className="text-lg h-12 bg-teal-500 hover:bg-teal-600 text-white">
                Create Your Free Account
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
