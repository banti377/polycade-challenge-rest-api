const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');

import machineRoutes from './routes/machine-routes';
import priceRoutes from './routes/price-routes';

dotenv.config();

const app = new Koa();
const PORT = process.env.PORT || 1337;

app
	.use(bodyParser())
	.use(priceRoutes.routes())
	.use(machineRoutes.routes())
	.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
