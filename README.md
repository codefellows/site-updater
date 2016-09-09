# site-updater
Updates a website based on web hooks from Contentful.com

# Prerequisites

- at least NodeJS 6.5.0
- git
- site hosted with [Aerobatic](https://www.aerobatic.com) on [Bitbucket](http://www.bitbucket.org)

# Install

Use a standard server setup (e.g. t2-micro) with the Prerequisites and [pm2](https://github.com/Unitech/pm2) or other node process runner.

e.g. https://www.digitalocean.com/community/tutorials/how-to-use-pm2-to-setup-a-node-js-production-environment-on-an-ubuntu-vps

# License

[MIT](https://opensource.org/licenses/MIT)

# Contributing

Send a pull request, please! Stuff to work on:
- flexible config for repositories
- topic handling (besides any update)
- error handling
- tests
- documentation

# Author

[Ivan Storck](http://ivanstorck.com)
