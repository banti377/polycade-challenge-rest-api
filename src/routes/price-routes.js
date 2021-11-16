import Router from 'koa-router';

import * as priceController from '../controllers/price-controller';

const priceRoutes = new Router({
	prefix: '/pricing-models'
});

priceRoutes
	.get('/', priceController.getAllPricingModels)
	.post('/', priceController.createPricingModel)
	.get('/:pmId', priceController.getSinglePricingModel)
	.put('/:pmId', priceController.updatePricingModel)
	.get('/:pmId/prices', priceController.getPriceConfig)
	.post('/:pmId/prices', priceController.createPriceConfig)
  .delete('/:pmId/prices/:priceId', priceController.removePriceConfig);

export default priceRoutes;
