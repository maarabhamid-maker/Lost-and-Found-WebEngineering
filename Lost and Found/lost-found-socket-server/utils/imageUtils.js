// utils/imageUtils.js
function processImage(imageData) {
  // Heavy computation (real logic goes here)
  return {
    size: imageData.size * 0.6,
    format: 'jpeg',
    validated: true
  }
}

module.exports = { processImage }
