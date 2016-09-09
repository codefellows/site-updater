/* eslint-disable semi, global-require, no-console */
const path = require('path');
const sh = require('shelljs')

const fs = require('fs-extra-promise')

// Requires a test to see if .env file exists because it will not on CI build
if (fs.existsSync('.env')) require('dotenv').config()

const repo = process.env.REPO
const repoName = process.env.REPO_NAME
const tmpDir = process.env.TMP_DIR || '/tmp'
const tmpRepoDir = path.join(tmpDir, repoName)
const date = new Date()
const humanDate = `${date.toDateString()} ${date.toTimeString()}`

module.exports = function updater() {
  // remove the previous directory
  sh.exec(`rm -rf ${tmpRepoDir}`)
  // clone the repo
  const cloneResult = sh.exec(`git clone --depth=1 ${repo} ${tmpRepoDir}`)
  if (!(cloneResult === undefined || cloneResult === null)) {
    console.log(cloneResult.stdout)
    console.log(cloneResult.stderr)
  }
  if (cloneResult.code === 0) {
    sh.exec(`cd ${tmpRepoDir}`)
    process.chdir(tmpRepoDir)
    // make an empty commit
    const commitResult = sh.exec(
      `git commit --allow-empty -m \'Site update from contentful ${humanDate} \'`
    )
    if (commitResult.code === 0) {
      // push the empty commit
      const pushResult = sh.exec('git push origin master')
      if (pushResult.code === 0) {
        console.log('push succeeded and site is rebuilding')
      } else {
        console.log(`push failed: ${pushResult.stderr} `)
      }
    } else {
      console.log(`commit failed: ${commitResult.stderr}`)
    }
  } else if (cloneResult === undefined) {
    console.log('clone result was undefined -- possible duplicate')
  } else {
    console.log(`clone failed: ${cloneResult.stderr}`)
  }
}
