var sh = require('shelljs')
var repo = 'git@bitbucket.org:code-fellows/website.git'
const date = new Date()
const humanDate = `${date.toDateString()} ${date.toTimeString()}`

export default function() {
  // remove the previous directory
  sh.exec('rm -rf website')
  // clone the repo
  cloneResult = sh.exec(`git clone --depth=1 ${repo}`)
  if (cloneResult.code === 0) {
    // make an empty commit
    var commitResult = sh.exec('git commit --allow-empty -m \'Site update from contentful ${humanDate} \'')
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
}
