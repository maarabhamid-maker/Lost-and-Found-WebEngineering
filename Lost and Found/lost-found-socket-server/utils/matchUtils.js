// utils/matchUtils.js

function findMatches(lostItems, foundItems) {
  const matches = []

  for (const lost of lostItems) {
    for (const found of foundItems) {
      if (
        lost.category === found.category &&
        lost.location === found.location
      ) {
        matches.push({ lost, found })
      }
    }
  }

  return matches
}

module.exports = { findMatches }
