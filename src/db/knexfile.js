import dotenv from 'dotenv';
dotenv.config();

import config from '../config';

export const dbConfig = {
	development: {
		client: 'postgresql',
		connection: {
			host: config.dbHost,
			port: config.dbPort,
			user: config.dbUser,
			password: config.dbPassword,
			database: 'polycade'
		},
		migrations: {
			directory: 'migrations',
			stub: 'migrations/migration.stub',
			schemaName: 'public',
			tableName: 'knex_migrations'
		}
	}
};

