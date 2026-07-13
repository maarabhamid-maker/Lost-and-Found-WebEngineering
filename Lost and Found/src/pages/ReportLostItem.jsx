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
import { Upload, Loader2, FilePlus } from 'lucide-react'

const CATEGORIES = [
  'Wallet', 'Phone', 'Keys', 'Bag', 'Jewelry', 'Clothing',
  'Electronics', 'Documents', 'Pet', 'Other'
]

export function ReportLostItem() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const isAuthenticated = !!user

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
      <DashboardLayout title="Report Lost Item">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-white mb-4">Sign in Required</h2>
          <p className="text-slate-400 mb-8">Please sign in to report a lost item.</p>
          <Button onClick={() => navigate('/login')}>Sign In</Button>
        </div>
      </DashboardLayout>
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
    if (!phone) return true
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
      toast.error('Please enter a valid Pakistani phone number (+92XXXXXXXXXX or 03XXXXXXXXX)')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('userId', user.id)
      formData.append('type', 'lost')
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
        toast.success('Lost item reported successfully!')
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
    <DashboardLayout title="Report Lost Item">
      <div className="max-w-3xl mx-auto">
        <Card className="overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <FilePlus className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-3xl text-white">Report Lost Item</CardTitle>
                <CardDescription className="text-slate-300">
                  Tell us about your lost item so we can help reunite it with you.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block text-white">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="border-white/20 bg-white/10 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-white">Item Title</label>
                <Input
                  placeholder="e.g. Black iPhone 14 Pro"
                  className="border-white/20 bg-white/10 text-white placeholder:text-slate-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-white">Description</label>
                <Textarea
                  rows={4}
                  placeholder="Describe the item, color, brand, condition, unique marks etc."
                  className="border-white/20 bg-white/10 text-white placeholder:text-slate-400"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-white">Lost Location</label>
                  <Input
                    placeholder="Where did you lose it?"
                    className="border-white/20 bg-white/10 text-white placeholder:text-slate-400"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-white">Date Lost</label>
                  <Input
                    type="date"
                    className="border-white/20 bg-white/10 text-white"
                    value={itemDate}
                    onChange={(e) => setItemDate(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-white">Phone Number (Optional)</label>
                <Input
                  type="tel"
                  placeholder="+92 333 1234567"
                  className="border-white/20 bg-white/10 text-white placeholder:text-slate-400"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  disabled={loading}
                />
                <p className="text-xs text-slate-400 mt-2">
                  Your registered email (
                  <span className="text-cyan-300">{user.email}</span>
                  ) will be used as the primary contact.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-white">Item Photo</label>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6">
                  {preview ? (
                    <div className="space-y-4">
                      <img src={preview} alt="Preview" className="w-full max-h-72 rounded-xl object-cover" />
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
                      <Upload className="w-10 h-10 text-slate-400 mb-3" />
                      <span className="text-white font-medium">Click to upload an image</span>
                      <span className="text-xs text-slate-400 mt-1">PNG, JPG or JPEG (Max 10MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                        disabled={loading}
                      />
                    </label>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                size="lg"
                disabled={loading || uploading}
              >
                {loading || uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Reporting...
                  </>
                ) : (
                  'Report Lost Item'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}