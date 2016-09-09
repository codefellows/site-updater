const path = require('path');
const sh = require('shelljs')

const repo = 'git@bitbucket.org:code-fellows/website.git'
const repoName = 'website'
const tmpDir = '/tmp'
const tmpRepoDir = path.join(tmpDir, repoName)
const date = new Date()
const humanDate = `${date.toDateString()} ${date.toTimeString()}`

module.exports = function() {
  // remove the previous directory
  sh.exec(`rm -rf ${tmpRepoDir}`)
  // clone the repo
  cloneResult = sh.exec(`git clone --depth=1 ${repo} ${tmpRepoDir}`)
  if (cloneResult.code === 0) {
    sh.exec(`cd ${tmpRepoDir}`)
    process.chdir(tmpRepoDir)
    // make an empty commit
    const commitResult = sh.exec(`git commit --allow-empty -m \'Site update from contentful ${humanDate} \'`)
    if (commitResult.code === 0) {
      // push the empty commit
      const pushResult = sh.exec('git push origin master')
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
