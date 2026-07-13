import { DashboardLayout } from '@/components/DashboardLayout'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getApiUrl } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Upload, Loader2 } from 'lucide-react'

const CATEGORIES = [
  'Wallet', 'Phone', 'Keys', 'Bag', 'Jewelry', 'Clothing',
  'Electronics', 'Documents', 'Pet', 'Other'
]

export function ReportItem() {
  const navigate = useNavigate()
  
  // Check localStorage for logged-in user
  const user = JSON.parse(localStorage.getItem('user'))
  const isAuthenticated = !!user

  const [type, setType] = useState('lost')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [itemDate, setItemDate] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Sign in Required</h1>
        <p className="text-muted-foreground mb-8">
          Please sign in to report an item.
        </p>
        <Button onClick={() => navigate('/login')}>Sign In</Button>
      </div>
    )
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }
const isDateWithinLast3Months = (selectedDate) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const minDate = new Date(today)
  minDate.setMonth(today.getMonth() - 3)

  const enteredDate = new Date(selectedDate + 'T00:00:00')

  return enteredDate >= minDate && enteredDate <= today
}
const isValidPakistaniPhone = (phone) => {
  if (!phone) return true // optional field

  const cleaned = phone.replace(/\s|-/g, '')

  const withCountryCode = /^\+92\d{10}$/
  const withoutCountryCode = /^03\d{9}$/

  return withCountryCode.test(cleaned) || withoutCountryCode.test(cleaned)
}


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!category) {
      toast.error('Please select a category')
      return
    }

if (!isDateWithinLast3Months(itemDate)) {
  toast.error('Date entered must be within the last 3 months')
  return
}
if (!isValidPakistaniPhone(contactPhone)) {
  toast.error(
    'Please enter a valid Pakistani phone number (+92XXXXXXXXXX or 03XXXXXXXXX)'
  )
  return
}


    setLoading(true)

    try {
      // Prepare FormData for PHP
      const formData = new FormData()
      formData.append('userId', user.id)
      formData.append('type', type)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('location', location)
      formData.append('itemDate', itemDate)
      formData.append('contactEmail', user.email)
      let normalizedPhone = contactPhone

if (contactPhone?.startsWith('03')) {
  normalizedPhone = '+92' + contactPhone.slice(1)
}

formData.append('contactPhone', normalizedPhone || '')

      if (image) formData.append('image', image)

      const response = await fetch(getApiUrl('/report_item.php'), {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Item reported successfully!')
        navigate('/dashboard')
      } else {
        toast.error(data.message || 'Failed to report item.')
      }

    } catch (err) {
      console.error('Error reporting item:', err)
      toast.error('Failed to report item. Please try again.')
    } finally {
      setLoading(false)
      setUploading(false)
    }
  }
return (
  <div className="relative min-h-screen overflow-hidden bg-[#0a192f] py-12">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_22%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.12),_transparent_28%)]" />
    <div className="pointer-events-none absolute inset-x-0 top-24 h-72 bg-white/5 blur-3xl" />
    <div className="relative z-10 max-w-2xl mx-auto px-4">
      <Card className="overflow-hidden border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl shadow-slate-950/30">
        <CardHeader>
          <CardTitle className="text-3xl text-white">Report an Item</CardTitle>
          <CardDescription className="text-white/70">
            Tell us about your lost or found item so we can help reunite it with its owner
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Type & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-white">Item Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white shadow-sm focus:border-white/30 focus:ring-1 focus:ring-white/20"
                >
                  <option value="lost">Lost Item</option>
                  <option value="found">Found Item</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-white">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white focus:border-white/30 focus:ring-1 focus:ring-white/20">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <label className="text-sm font-medium mb-2 block text-white">Item Title</label>
              <Input
                className="text-white placeholder:text-white border-white/20 bg-white/10 focus-visible:ring-1 focus-visible:ring-white/20"
                placeholder="e.g., Black iPhone 14 Pro"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-white">Description</label>
              <Textarea
                className="text-white placeholder:text-white border-white/20 bg-white/10 focus-visible:ring-1 focus-visible:ring-white/20"
                placeholder="Describe distinguishing features, condition, brand, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                disabled={loading}
              />
            </div>

            {/* Location & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-white">Location</label>
                <Input
                  className="text-white placeholder:text-white border-white/20 bg-white/10 focus-visible:ring-1 focus-visible:ring-white/20"
                  placeholder="Where was it lost/found?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block text-white">Date</label>
                <Input
                  className="text-white placeholder:text-white border-white/20 bg-white/10 focus-visible:ring-1 focus-visible:ring-white/20"
                  type="date"
                  value={itemDate}
                  onChange={(e) => setItemDate(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Contact */}
            <div>
              <label className="text-sm font-medium mb-2 block text-white">Phone (Optional)</label>
              <Input
                className="text-white placeholder:text-white border-white/20 bg-white/10 focus-visible:ring-1 focus-visible:ring-white/20"
                type="tel"
                placeholder="+92 333 2987234"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                We'll use {user.email} as the primary contact
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Item Photo</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6">
                {preview ? (
                  <div className="space-y-4">
                    <img src={preview} alt="Preview" className="w-full max-h-64 object-cover rounded-lg"/>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => { setImage(null); setPreview('') }}
                      disabled={loading}
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium">Click to upload or drag and drop</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</span>
                    <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" disabled={loading} />
                  </label>
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading || uploading}
            >
              {uploading || loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : 'Report Item'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}