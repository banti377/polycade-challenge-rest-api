import Router from 'koa-router';

import * as machineController from '../controllers/machine-controller';

const machineRoutes = new Router({
	prefix: '/machines'
});

machineRoutes
	.put('/:machineId/prices/:pmId', machineController.updatePriceConfigForMachine);

export default machineRoutes;
