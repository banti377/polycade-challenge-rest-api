import Router from 'koa-router';

import * as priceController from '../controllers/price-controller';

const priceRoutes = new Router({
	prefix: '/pricing-models'
});

priceRoutes
	.get('/', priceController.getAllPricingModels)
	.post('/', priceController.createPricingModel)
	.get('/:pmId', priceController.getSinglePricingModel);
// .put('/:pmId', PriceController.updatePricingModel);

export default priceRoutes;
