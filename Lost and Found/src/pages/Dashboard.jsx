import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { getApiUrl } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, AlertCircle, Loader2, MapPin, Calendar, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function Dashboard() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const user = JSON.parse(localStorage.getItem('user'))

  const getUserName = (user) => {
    if (!user) return 'User'
    if (user.displayName) return user.displayName
    if (user.name) return user.name
    if (user.email) {
      const namePart = user.email.split('@')[0]
      return namePart
        .replace(/[._]/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
    return 'User'
  }

  const greetingName = getUserName(user)

useEffect(() => {
  if (!user) {
    navigate('/login')
    return
  }

  loadData()  // run only once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
const confirmDelivered = async (matchId) => {
  if (!confirm('Has this item been delivered successfully?')) return

  try {
    const res = await fetch(
      'https://maarab.fwh.is/lostfound/update_match_status.php',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ match_id: matchId })
      }
    )

    const data = await res.json()

    if (data.success) {
      setMatches(prev =>
        prev.map(m =>
          m.match_id === matchId
            ? { ...m, status: 'delivered' }
            : m
        )
      )
      toast.success('Item marked as delivered')
    } else {
      toast.error('Failed to update status')
    }
  } catch (err) {
    console.error(err)
    toast.error('Server error')
  }
}
const hideMatch = async (matchId) => {
  if (!confirm('Remove this match from your dashboard?')) return

  try {
    const res = await fetch(
      `https://maarab.fwh.is/lostfound/hide_match.php?match_id=${matchId}&user_id=${user.id}`
    )

    const data = await res.json()

    if (data.success) {
      setMatches(prev => prev.filter(m => m.match_id !== matchId))
      toast.success('Match removed from your dashboard')
    } else {
      toast.error(data.message || 'Failed to remove match')
    }
  } catch (err) {
    console.error(err)
    toast.error('Server error')
  }
}
  const loadData = async () => {
    try {
      setLoading(true)
      const res = await fetch(getApiUrl(`/dashboard.php?userId=${user.id}`))
      const data = await res.json()
      console.log("Dashboard data:", data)

      if (!data.success) {
        toast.error('Failed to load dashboard')
        return
      }

      setItems(data.items || [])
      setMatches(data.matches || [])

    } catch (err) {
      console.error("Error fetching dashboard:", err)
      toast.error('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

const handleDelete = async (itemId) => {
  if (!confirm('Are you sure you want to delete this item?')) return;

  try {
    setDeleting(itemId);

    // Send DELETE request to backend
    const res = await fetch(getApiUrl(`/delete_item.php?id=${itemId}`), {
      method: 'DELETE'
    });

    const data = await res.json();

    if (data.success) {
      // Remove item from local state
      setItems(prevItems => prevItems.filter(i => i.id !== itemId));

      // Optionally, also remove related matches from local state
      setMatches(prevMatches =>
        prevMatches.filter(
          match => match.lost_item_id !== itemId && match.found_item_id !== itemId
        )
      );

      toast.success('Item deleted successfully');
    } else {
      toast.error(data.message || 'Failed to delete item');
    }

  } catch (err) {
    console.error("Error deleting item:", err);
    toast.error('Failed to delete item');
  } finally {
    setDeleting(null);
  }
};


  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Sign in Required</h1>
        <p className="text-muted-foreground">Please sign in to view your dashboard.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#0F172A_0%,_#073359_100%)] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-serif font-extrabold tracking-tight mb-2 text-white">
            Hello, {greetingName}
          </h1>
          <p className="text-lg text-slate-300">Manage your lost and found items</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <Card className="overflow-hidden border border-white/20 bg-gradient-to-br from-[#157E90] to-[#0048A0] backdrop-blur-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.3em] text-white opacity-90">
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0 text-white">
              <div className="text-5xl font-bold">{items.length}</div>
              <p className="mt-3 text-sm text-slate-100/85">
                {items.filter(i => i.type === 'lost').length} lost,{' '}
                {items.filter(i => i.type === 'found').length} found
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-white/20 bg-gradient-to-br from-[#157E90] to-[#0048A0] backdrop-blur-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-100 opacity-90">
                Active Matches
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0 text-white">
              <div className="text-5xl font-bold">{matches.length}</div>
              <p className="mt-3 text-sm text-slate-100/85">Current matches</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-white/20 bg-gradient-to-br from-[#157E90] to-[#0048A0] backdrop-blur-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-100 opacity-90">
                Recovery Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0 text-white">
              <div className="text-5xl font-bold">72%</div>
              <p className="mt-3 text-sm text-slate-100/85">Community average</p>
            </CardContent>
          </Card>
        </div>

      {/* Tabs */}
      <Tabs defaultValue="items" className="space-y-6">
        <TabsList>
          <TabsTrigger value="items">My Items</TabsTrigger>
          <TabsTrigger value="matches">Matches ({matches.length})</TabsTrigger>
        </TabsList>

        {/* Items Tab */}
        <TabsContent value="items" className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <Card className="border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl text-white">
              <CardContent className="py-12 text-center">
                <AlertCircle className="w-12 h-12 text-white/60 mx-auto mb-4 opacity-70" />
                <h3 className="font-semibold mb-2">No items yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start by reporting a lost or found item
                </p>
                <Link to="/report">
                  <Button>Report an Item</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <Card key={item.id} className="border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl text-white">
                  <CardContent className="py-4">
                    <div className="flex gap-4">
                      {item.image_url && (
  <img
    src={`https://maarab.fwh.is/lostfound/${item.image_url}`} // prepend backend URL
    alt={item.title}
    className="w-24 h-24 rounded-lg object-cover"
  />
)}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <Badge variant={item.type === 'lost' ? 'destructive' : 'default'}>
                            {item.type === 'lost' ? 'Lost' : 'Found'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.item_date + 'T00:00:00').toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(item.id)}
                            disabled={deleting === item.id}
                          >
                            {deleting === item.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Matches Tab */}
        <TabsContent value="matches" className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : matches.length === 0 ? (
            <Card className="border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl text-white">
              <CardContent className="py-12 text-center">
                <Heart className="w-12 h-12 text-white/70 mx-auto mb-4 opacity-80" />
                <h3 className="font-semibold mb-2">No matches yet</h3>
                <p className="text-muted-foreground">Matches will appear here when items are found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {matches.map(match => {
                const isMyLost = match.lost_user_id === user.id

                const myItem = {
                  title: isMyLost ? match.lost_title : match.found_title,
                  type: isMyLost ? 'lost' : 'found'
                }

                const otherItem = {
                  title: isMyLost ? match.found_title : match.lost_title,
                  contact_email: isMyLost ? match.found_contact_email : match.lost_contact_email,
                  contact_phone: isMyLost ? match.found_user_phone : match.lost_user_phone
                }

                return (
                  <Card key={match.match_id} className="border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl text-white">
                    <CardHeader>
  <div className="flex justify-between items-center">
    <div>
      <CardTitle className="text-white">Matched Item: {otherItem.title}</CardTitle>
      <CardDescription className="text-slate-200/90">
        Your item: {myItem.title} | Status:{' '}
        <span className={match.status === 'delivered' ? 'text-green-400 font-semibold' : 'text-yellow-300'}>
          {match.status}
        </span>{' '}
        | Similarity: {(match.similarity_score * 10).toFixed(0)}%
      </CardDescription>
    </div>

    <div className="flex gap-2">
  {match.status === 'pending' && (
    <Button
      size="icon"
      variant="outline"
      onClick={() => confirmDelivered(match.match_id)}
    >
      <CheckCircle className="w-5 h-5 text-green-600" />
    </Button>
  )}

  <Button
    size="icon"
    variant="ghost"
    onClick={() => hideMatch(match.match_id)}
  >
    <Trash2 className="w-5 h-5 text-red-500" />
  </Button>
</div>

  </div>
</CardHeader>

                    <CardContent>
                      <p>Contact: <strong>{otherItem.contact_email}</strong> | {otherItem.contact_phone}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  </div>
  )
}