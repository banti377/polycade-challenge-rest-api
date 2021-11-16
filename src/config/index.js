const config = {
	dbHost: process.env.DB_HOST || '127.0.0.1',
	dbPort: process.env.DB_PORT || 5432,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME
};

export default config;
