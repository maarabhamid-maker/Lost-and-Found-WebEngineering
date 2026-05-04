import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Search, Bell, Shield } from 'lucide-react'

export function Home() {
  // Check if a user is logged in by reading from localStorage
  const user = JSON.parse(localStorage.getItem('user'))
  const isAuthenticated = !!user

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/80 px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Reconnecting Lost with Found</span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Find Your Lost Items
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
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
                  <Button size="lg" variant="outline" className="text-lg h-12">
                    View Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <Button size="lg" className="text-lg h-12">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="text-lg h-12">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Report lost or found items with photos, location, and details
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Match</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our system automatically matches lost and found items
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Notify</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get real-time notifications when potential matches are found
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Safe, verified communication between owners and finders
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
              <p className="text-muted-foreground">Items Posted</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1,800+</div>
              <p className="text-muted-foreground">Successfully Matched</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">72%</div>
              <p className="text-muted-foreground">Recovery Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Find Your Items?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of people who have successfully recovered their lost items through our platform.
          </p>

          {!isAuthenticated && (
            <Link to="/signup">
              <Button size="lg" className="text-lg h-12">
                Create Your Free Account
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
