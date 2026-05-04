const { parentPort } = require('worker_threads')
const { findMatches } = require('../utils/matchUtils')

parentPort.on('message', ({ lostItems, foundItems }) => {
  try {
    const matches = findMatches(lostItems, foundItems)
    parentPort.postMessage({ success: true, data: matches })
  } catch (error) {
    parentPort.postMessage({ success: false, error: error.message })
  }
})
