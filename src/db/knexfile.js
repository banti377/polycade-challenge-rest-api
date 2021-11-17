const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

const config = require('../config');

module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			host: config.dbHost,
			port: config.dbPort,
			user: config.dbUser,
			password: config.dbPassword,
			database: config.dbName
		},
		migrations: {
			directory: path.join(__dirname, './migrations')
		},
		seeds: {
			directory: path.join(__dirname, './seeds')
		}
	},
	test: {
		client: 'postgresql',
		connection: {
			host: config.dbHost,
			port: config.testDBPort,
			user: config.dbUser,
			password: config.dbPassword,
			database: config.testDBName
		},
		migrations: {
			directory: path.join(__dirname, './migrations')
		},
		seeds: {
			directory: path.join(__dirname, './seeds')
		}
	}
};

