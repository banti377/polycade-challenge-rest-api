import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';

import machineRoutes from './routes/machine-routes';
import priceRoutes from './routes/price-routes';

dotenv.config();

const app = new Koa();
const PORT = process.env.PORT || 1337;

app
	.use(bodyParser())
	.use(priceRoutes.routes())
	.use(machineRoutes.routes());

// Do not start server in testing environment as we're using supertest for testing purpose.
if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
}

// Exporting for using in tests.
module.exports = app;
