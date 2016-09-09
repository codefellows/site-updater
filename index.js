var sh = require('shelljs')

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
  // clone the repo
  cloneResult = sh.exec('git clone git@bitbucket.org:code-fellows/website.git')
  // make an empty commit
  var commitResult = sh.exec('git commit --allow-empty -m \'Site update from contentful\'')
  if (commitResult !== 0) {
    // push the empty commit
    var pushResult = sh.exec('git push origin master')
  }
})
