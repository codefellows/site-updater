// node 6.5.0 and up

var sh = require('shelljs')

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
  // remove the previous directory
  sh.exec('rm -rf website')
  // clone the repo
  cloneResult = sh.exec('git clone --depth=1 git@bitbucket.org:code-fellows/website.git')
  if (cloneResult.code === 0) {
    // make an empty commit
    var commitResult = sh.exec('git commit --allow-empty -m \'Site update from contentful\'')
    if (commitResult.code === 0) {
      // push the empty commit
      var pushResult = sh.exec('git push origin master')
      if (pushResult.code === 0) {
        console.log(`push succeeded and site is rebuilding`)
      } else {
        console.log(`push failed: ${pushResult.stderr} `)
      }
    } else {
      console.log(`commit failed: ${commitResult.stderr}`)
    }
  } else {
    console.log(`clone failed: ${cloneResult.stderr}`)
  }

})
