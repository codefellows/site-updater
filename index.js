// Create server with default options
var server = require('contentful-webhook-server')()

// Start listening for requests on port 3000
server.listen(3000, function(){
 console.log('Contentful webhook server running on port ' + 3000)
})
