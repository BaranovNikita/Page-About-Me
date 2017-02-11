const nconf = require('nconf');

nconf.argv()
	.env()
	.defaults(require('../../config.json'));

module.exports = nconf;
