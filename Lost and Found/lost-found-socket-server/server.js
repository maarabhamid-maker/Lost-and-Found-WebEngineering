const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const { Worker } = require('worker_threads')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json()) // needed to parse JSON

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('User connected')

  // ==================== FAQ Chat ====================
  socket.on('question', (msg) => {
    let reply = "Thanks for your question! Our team will respond soon."

    if (msg.toLowerCase().includes('report')) {
      reply = 'You can report a lost item from the dashboard.'
    } else if (msg.toLowerCase().includes('contact')) {
      reply = 'You can contact the finder via email or phone.'
    }

    socket.emit('reply', reply)
  })

  // ==================== Image Processing ====================
  socket.on('processImage', (imageData) => {
    const worker = new Worker(path.resolve(__dirname, './workers/imageWorker.js'))

    worker.postMessage(imageData)

    worker.on('message', (processedImage) => {
      socket.emit('imageProcessed', processedImage)
      worker.terminate()
    })

    worker.on('error', (err) => {
      console.error(err)
      socket.emit('imageProcessed', { error: err.message })
      worker.terminate()
    })
  })

  // ==================== Matching Logic ====================
  socket.on('matchItems', ({ lostItems, foundItems }) => {
    const worker = new Worker(path.resolve(__dirname, './workers/matchWorker.js'))

    worker.postMessage({ lostItems, foundItems })

    worker.on('message', (matches) => {
      socket.emit('matchesFound', matches)
      worker.terminate()
    })

    worker.on('error', (err) => {
      console.error(err)
      socket.emit('matchesFound', { error: err.message })
      worker.terminate()
    })
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

server.listen(5000, () => {
  console.log('Socket server running on port 5000')
})
