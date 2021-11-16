import { resStatuses } from '../constants';
import tables from '../constants/tables';
import knex from '../db';
import { asyncHandler } from '../utils/error-handler';

export const updatePriceConfigForMachine = asyncHandler(async (ctx) => {
	const { machineId, pmId } = ctx.params;

	const [machine] = await knex(tables.machine)
		.where('id', '=', machineId);
	ctx.assert(machine, 404, {
		status: resStatuses.error,
		message: `Could not find machine with id ${machineId}`
	});

	const [priceModel] = await knex(tables.price)
		.where('id', '=', pmId);
	ctx.assert(priceModel, 404, {
		status: resStatuses.error,
		message: `Could not find price model with id ${pmId}`
	});

	await knex(tables.machine)
		.where('id', '=', machineId)
		.update({
			// eslint-disable-next-line camelcase
			pricing_id: pmId
		});

	ctx.status = 200;
	ctx.body = {
		status: resStatuses.success
	};
});
