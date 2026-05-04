/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {string} userId
 * @property {'lost'|'found'} type
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} [imageUrl]
 * @property {string} location
 * @property {string} itemDate
 * @property {string} contactEmail
 * @property {string} [contactPhone]
 * @property {'active'|'claimed'|'resolved'} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Match
 * @property {string} id
 * @property {string} userId
 * @property {string} lostItemId
 * @property {string} foundItemId
 * @property {number} similarityScore
 * @property {'pending'|'confirmed'|'rejected'|'resolved'} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} userId
 * @property {string} matchId
 * @property {boolean} read
 * @property {string} createdAt
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} [displayName]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} BlinkDatabase
 * @property {{list:(function(any):Promise<Item[]>),create:(function(any):Promise<Item>),delete:(function(string):Promise<void>)}} db
 */

/**
 * @typedef {Object} BlinkClient
 * @property {BlinkDatabase} db
 */

// This file provides JSDoc typedefs so editors can still surface types.
// It's intentionally a no-op at runtime.
export {};
