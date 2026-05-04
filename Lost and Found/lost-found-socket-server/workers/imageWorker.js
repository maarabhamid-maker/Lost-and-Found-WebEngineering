const { parentPort } = require('worker_threads')
const { processImage } = require('../utils/imageUtils')

parentPort.on('message', (imageData) => {
  try {
    const processedImage = processImage(imageData)
    parentPort.postMessage({ success: true, data: processedImage })
  } catch (error) {
    parentPort.postMessage({ success: false, error: error.message })
  }
})
