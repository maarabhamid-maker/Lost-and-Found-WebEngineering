import { useState, useEffect, useCallback } from 'react'
import { getApiUrl } from '@/lib/api'
import { toast } from 'sonner'

// Shared by Dashboard, MyItems, and Matches so they all read/write the
// same items+matches state instead of each doing their own fetch.
export function useDashboardData() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [items, setItems] = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = useCallback(async () => {
    if (!user) return
    try {
      setLoading(true)
      const res = await fetch(getApiUrl(`/dashboard.php?userId=${user.id}`))
      const data = await res.json()

      if (!data.success) {
        toast.error('Failed to load dashboard')
        return
      }

      setItems(data.items || [])
      setMatches(data.matches || [])
    } catch (err) {
      console.error('Error fetching dashboard:', err)
      toast.error('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  useEffect(() => {
    loadData()
  }, [loadData])

  return { user, items, matches, setItems, setMatches, loading, reload: loadData }
}
