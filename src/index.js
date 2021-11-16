const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');

const knex = require('./db/index');

dotenv.config();

const app = new Koa();
const PORT = process.env.PORT || 1337;
const router = new Router();

router
	.use(bodyParser())
	.get('/', (ctx, next) => {
		ctx.body = 'hello world';
	});

app
	.use(router.routes())
	.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
