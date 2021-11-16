import Router from 'koa-router';

import * as machineController from '../controllers/machine-controller';

const machineRoutes = new Router({
	prefix: '/machines'
});

machineRoutes
	.put('/:machineId/prices/:pmId', machineController.updatePriceConfigForMachine)
	.delete('/:machineId/prices/:pmId', machineController.removePriceModelFromMachine)
	.get('/:machineId/prices', machineController.getPricingDetailsForMachine);

export default machineRoutes;
