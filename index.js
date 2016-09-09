const updater = require('./lib/updater')
const fs = require('fs-extra-promise')

// Requires a test to see if .env file exists because it will not on CI build
if (fs.existsSync('.env')) require('dotenv').config()

// Create server with default options
var server = require('contentful-webhook-server')()
var port = process.env.PORT || 3000

// Start listening for requests
server.listen(port, function(){
 console.log('Contentful webhook server running on port ' + port)
})

// Handler for all successful requests
// Is not emitted when an error occurs
server.on('ContentManagement.*', function(topic, req){
  // topic is available as string
  // => e.g. ContentManagement.Asset.unpublish
  console.log('Request came in for: ' + topic);
  updater()
})
