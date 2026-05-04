import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getApiUrl } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'

export function SignUp() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [loading, setLoading] = useState(false)

  // 🔐 Validation Helpers
  const isValidUsername = (value) => /^[A-Za-z\s]+$/.test(value)

const isValidEmail = (value) =>
  /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)

const isValidPassword = (value) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)


  const isAdult = (date) => {
    const birthDate = new Date(date)
    const today = new Date()

    if (birthDate > today) return false

    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age >= 18
  }

  const isValidRollNo = (value) =>
    /^\d{3}$/.test(value) && Number(value) >= 1 && Number(value) <= 200

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ❌ Frontend Validation
    if (!isValidUsername(username)) {
      toast.error('Username must contain letters only')
      return
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    if (!isValidPassword(password)) {
      toast.error(
        'Password must be 6-8 characters with uppercase, lowercase, number & special character'
      )
      return
    }

    if (!isAdult(dob)) {
      toast.error('You must be at least 18 years old')
      return
    }

    if (!isValidRollNo(rollNumber)) {
      toast.error('Roll number must be 3 digits between 001 and 200')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(getApiUrl('/signup.php'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          dob,
          roll_number: rollNumber,
        }),
      })

      const data = await res.json()

      if (!data.success) {
        throw new Error(data.message || 'Sign up failed')
      }

      toast.success('Account created successfully!')
      setTimeout(() => navigate('/login'), 1500)

    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred'

      if (message.includes('exists')) {
        toast.error('Username, email, or roll number already exists')
      } else {
        toast.error(message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center font-serif">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Join Lost & Found Hub to report or recover items
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm font-medium">Username</label>
              <Input
                type="text"
                placeholder="Ali Ahsan"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 8 characters
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Date of Birth</label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Roll Number</label>
              <Input
                type="text"
                placeholder="123"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:underline font-semibold"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
