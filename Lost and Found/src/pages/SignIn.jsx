import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

export function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useAuth()  // <-- use AuthContext
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const success = await signIn(email, password) // <-- call context function

      if (success) {
        toast.success('Signed in successfully!')
        navigate('/dashboard') // navigate immediately
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'

      if (message.toLowerCase().includes('invalid')) {
        toast.error('Invalid email or password.')
      } else {
        toast.error(message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[url('/Uni2.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" />
      <Card className="w-full max-w-md relative z-10 bg-white/10 border border-white/20 backdrop-blur-lg shadow-2xl">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-cyan-300" />
          </div>
          <CardTitle className="text-2xl text-center font-serif text-white">Welcome Back</CardTitle>
          <CardDescription className="text-center text-slate-100">
            Sign in to your Lost & Found Hub account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-white">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-300 hover:text-teal-200 font-semibold">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}