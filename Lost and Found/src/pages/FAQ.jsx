import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function FAQ() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const socketRef = useRef(null)

  useEffect(() => {
    // 🔌 Create socket connection once (use Vite env var with fallback)
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket'],
    })

    socketRef.current.on('reply', (data) => {
      setChat((prev) => [...prev, { type: 'bot', text: data }])
    })

    socketRef.current.on('connect_error', () => {
      setChat((prev) => [
        ...prev,
        { type: 'bot', text: '⚠ Server connection failed' },
      ])
    })

    // 🧹 Cleanup on unmount
    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  const sendMessage = () => {
    if (!message.trim()) return

    setChat((prev) => [...prev, { type: 'user', text: message }])
    socketRef.current.emit('question', message)
    setMessage('')
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• How do I report a lost item?</p>
          <p>• How can I contact the finder?</p>
          <p>• Is my data secure?</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ask a Question (Live)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-40 border rounded p-2 overflow-y-auto text-sm">
            {chat.map((c, i) => (
              <div
                key={i}
                className={c.type === 'user' ? 'text-right' : 'text-left'}
              >
                <span className="block">{c.text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
