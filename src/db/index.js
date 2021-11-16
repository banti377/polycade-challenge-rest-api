import config from '../config';

export const knex = require('knex')({
	client: 'pg',
	connection: {
		host: config.dbHost,
		port: config.dbPort,
		user: config.dbUser,
		password: config.dbPassword,
		database: config.dbName
	}
});
