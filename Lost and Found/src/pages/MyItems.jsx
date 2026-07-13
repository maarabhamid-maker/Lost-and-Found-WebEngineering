import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '@/components/DashboardLayout'
import { useDashboardData } from '@/hooks/useDashboardData'
import { getApiUrl } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, Loader2, MapPin, Calendar, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function MyItems() {
  const { items, setItems, setMatches, loading } = useDashboardData()
  const [deleting, setDeleting] = useState(null)

  const handleDelete = async (itemId) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      setDeleting(itemId)
      const res = await fetch(getApiUrl(`/delete_item.php?id=${itemId}`), { method: 'DELETE' })
      const data = await res.json()

      if (data.success) {
        setItems((prev) => prev.filter((i) => i.id !== itemId))
        setMatches((prev) =>
          prev.filter((m) => m.lost_item_id !== itemId && m.found_item_id !== itemId)
        )
        toast.success('Item deleted successfully')
      } else {
        toast.error(data.message || 'Failed to delete item')
      }
    } catch (err) {
      console.error('Error deleting item:', err)
      toast.error('Failed to delete item')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <DashboardLayout title="My Items">
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-300" />
        </div>
      ) : items.length === 0 ? (
        <Card className="border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl text-white">
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-12 h-12 text-white/60 mx-auto mb-4 opacity-70" />
            <h3 className="font-semibold mb-2">No items yet</h3>
            <p className="text-slate-300 mb-6">Start by reporting a lost or found item</p>
            <div className="flex justify-center gap-3">
              <Link to="/report-lost">
                <Button className="bg-orange-500 hover:bg-orange-600">Report Lost</Button>
              </Link>
              <Link to="/report-found">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-[#001A33]">Report Found</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl text-white">
              <CardContent className="py-4">
                <div className="flex gap-4">
                  {item.image_url && (
                    <img
                      src={`/api/${item.image_url}`}
                      alt={item.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-slate-300">{item.description}</p>
                      </div>
                      <Badge variant={item.type === 'lost' ? 'destructive' : 'default'}>
                        {item.type === 'lost' ? 'Lost' : 'Found'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400 mt-2">
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
    </DashboardLayout>
  )
}
