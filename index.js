// Create server with default options
var server = require('contentful-webhook-server')()

// Start listening for requests on port 3000
server.listen(3000, function(){
 console.log('Contentful webhook server running on port ' + 3000)
})

// Handler for all successful requests
// Is not emitted when an error occurs
server.on('ContentManagement.*', function(topic, req){
  // topic is available as string
  // => e.g. ContentManagement.Asset.unpublish
  console.log('Request came in for: ' + topic);
})
