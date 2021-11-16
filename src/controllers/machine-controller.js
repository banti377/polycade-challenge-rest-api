import { resStatuses } from '../constants';
import tables from '../constants/tables';
import knex from '../db';
import { asyncHandler } from '../utils/error-handler';
// eslint-disable-next-line camelcase
import { default_pricing } from '../../prices.json';

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

export const removePriceModelFromMachine = asyncHandler(async (ctx) => {
	// We probably don't need pricing model id as a machine only has one pricing model.
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
			pricing_id: null
		});

	ctx.status = 200;
	ctx.body = {
		status: resStatuses.success
	};
});

export const getPricingDetailsForMachine = asyncHandler(async (ctx) => {
	const { machineId } = ctx.params;

	const [machine] = await knex(tables.machine)
		.where('id', '=', machineId);
	ctx.assert(machine, 404, {
		status: resStatuses.error,
		message: `Could not find machine with id ${machineId}`
	});

	const [priceDetails] = await knex(tables.price)
		.select([
			`${tables.price}.name as model_name`,
			`${tables.price}.id as model_id`,
			knex.raw(`json_build_object('id', ${tables.priceConfig}.id, 'name', ${tables.priceConfig}.name, 'value', ${tables.priceConfig}.value, 'price', ${tables.priceConfig}.price) as price_config`)
		])
		.where(`${tables.price}.id`, '=', machine.pricing_id)
		.leftJoin(
			`${tables.priceConfig}`,
			`${tables.price}.id`,
			`${tables.priceConfig}.pricing_id`
		);

	// eslint-disable-next-line camelcase
	const pricingData = priceDetails || default_pricing;

	ctx.status = 200;
	ctx.body = {
		status: resStatuses.success,
		data: {
			pricingModel: pricingData
		}
	};
});
