// Need to import as for some reason its not loading env vars (probably an issue after traspiling js files)
const dotenv = require('dotenv');
dotenv.config();

const config = {
	dbHost: process.env.DB_HOST || '127.0.0.1',
	dbPort: process.env.DB_PORT || 5432,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME || 'polycade',
	testDBName: process.env.TEST_DB_NAME || 'test-polycade',
  testDBPort: process.env.TEST_DB_PORT || 5432,
	dbSchema: process.env.DB_SCHEMA || 'public'
};

module.exports = config;
