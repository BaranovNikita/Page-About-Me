const bunyan = require('bunyan');

const log = bunyan.createLogger({
	name: 'page-about-me',
	stream: process.stdout,
	level: 'info'
});

module.exports = {
	getLogger: () => log
};
