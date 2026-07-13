import { DashboardLayout } from '@/components/DashboardLayout'
import { useDashboardData } from '@/hooks/useDashboardData'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Loader2, CheckCircle, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function Matches() {
  const { user, matches, setMatches, loading } = useDashboardData()

  const confirmDelivered = async (matchId) => {
    if (!confirm('Has this item been delivered successfully?')) return

    try {
      const res = await fetch('/api/update_match_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ match_id: matchId }),
      })
      const data = await res.json()

      if (data.success) {
        setMatches((prev) =>
          prev.map((m) => (m.match_id === matchId ? { ...m, status: 'delivered' } : m))
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
      const res = await fetch(`/api/hide_match.php?match_id=${matchId}&user_id=${user.id}`)
      const data = await res.json()

      if (data.success) {
        setMatches((prev) => prev.filter((m) => m.match_id !== matchId))
        toast.success('Match removed from your dashboard')
      } else {
        toast.error(data.message || 'Failed to remove match')
      }
    } catch (err) {
      console.error(err)
      toast.error('Server error')
    }
  }

  return (
    <DashboardLayout title="Matches">
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-300" />
        </div>
      ) : matches.length === 0 ? (
        <Card className="border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl text-white">
          <CardContent className="py-12 text-center">
            <Heart className="w-12 h-12 text-white/70 mx-auto mb-4 opacity-80" />
            <h3 className="font-semibold mb-2">No matches yet</h3>
            <p className="text-slate-300">Matches will appear here when items are found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => {
            const isMyLost = match.lost_user_id === user.id

            const myItem = {
              title: isMyLost ? match.lost_title : match.found_title,
            }

            const otherItem = {
              title: isMyLost ? match.found_title : match.lost_title,
              contact_email: isMyLost ? match.found_contact_email : match.lost_contact_email,
              contact_phone: isMyLost ? match.found_user_phone : match.lost_user_phone,
            }

            return (
              <Card key={match.match_id} className="border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl text-white">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-white">Matched Item: {otherItem.title}</CardTitle>
                      <CardDescription className="text-slate-300">
                        Your item: {myItem.title} | Status:{' '}
                        <span
                          className={
                            match.status === 'delivered'
                              ? 'text-teal-300 font-semibold'
                              : 'text-orange-300'
                          }
                        >
                          {match.status}
                        </span>{' '}
                        | Similarity: {(match.similarity_score * 10).toFixed(0)}%
                      </CardDescription>
                    </div>

                    <div className="flex gap-2">
                      {match.status === 'pending' && (
                        <Button size="icon" variant="outline" onClick={() => confirmDelivered(match.match_id)}>
                          <CheckCircle className="w-5 h-5 text-teal-400" />
                        </Button>
                      )}
                      <Button size="icon" variant="ghost" onClick={() => hideMatch(match.match_id)}>
                        <Trash2 className="w-5 h-5 text-orange-400" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p>
                    Contact: <strong>{otherItem.contact_email}</strong> | {otherItem.contact_phone}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}
