# site-updater
Updates a website based on web hooks from Contentful.com

# Prerequisites

- a server: ec2 micro instance or digital ocean, etc.
- at least NodeJS 6.5.0
- git
- site hosted with [Aerobatic](https://www.aerobatic.com) on [Bitbucket](http://www.bitbucket.org)

# Install

Use a standard server setup (e.g. t2-micro) with the Prerequisites and [pm2](https://github.com/Unitech/pm2) or other node process runner.

e.g. https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps

# Usage

`pm2 start index` starts the web server that processes the webhooks from Contentful.

Go to https://app.contentful.com/spaces/PUT-SPACE-ID-HERE/settings/webhooks to point the webhook to this server.

To manually update the site content:
You must have the private key to the ec2 instance in your ~/.ssh directory (it's in passpack, search for ec2)

 - `ssh -i ~/.ssh/cf-contentful-gatsby-website.pem ubuntu@site-updater.codefellows.org`
 - `node ./bin/site-update`

# Troubleshooting

- check that the manual process works and watch for any errors
- make sure you can connect via git on the command line to the bitbucket repo
- make sure you have set the port to 80 in a file called .env in the home directory (otherwise default is 3000 for dev)


# License

[MIT](https://opensource.org/licenses/MIT)

# Contributing

Send a pull request, please!

Stuff to work on:
- http basic auth
- SSL support
- flexible config for repositories (in dotenv?)
- topic handling (besides any update)
- error handling
- tests
- documentation
- get this working for free on https://zeit.co/now/

# Author

[Ivan Storck](http://ivanstorck.com)
