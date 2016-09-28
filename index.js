/* eslint-disable semi, global-require, no-console, prefer-arrow-callback */
const updater = require('./lib/updater')
const fs = require('fs-extra-promise')
const safeJsonStringify = require('safe-json-stringify')

// Requires a test to see if .env file exists because it will not on CI build
if (fs.existsSync('.env')) require('dotenv').config()

function timeout() {
  console.error('Could not close connections in time, forcefully shutting down');
  process.exit()
}

// Create server with default options
const server = require('contentful-webhook-server')({
  username: process.env.BASIC_AUTH_USER,
  password: process.env.BASIC_AUTH_PASS,
})

const port = process.env.PORT || 3000

// Start listening for requests
server.listen(port, function listening() {
  console.log(`Contentful webhook server running on port ${port}`)
})

server.on('ContentManagement.Entry.unpublish', function unpublishReq(req) {
  console.log(`An entry was unpublished: ${safeJsonStringify(req)}`)
  updater()
  server.close(function processExit() {
    process.exit()
  })
  setTimeout(timeout, 10 * 1000)
})

server.on('ContentManagement.Entry.publish', function publishReq(req) {
  console.log(`An entry was published: ${safeJsonStringify(req)}`)
  updater()
  server.close(function processExit() {
    process.exit()
  })
  setTimeout(timeout, 10 * 1000)
})
