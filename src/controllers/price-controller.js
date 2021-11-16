import { resStatuses } from '../constants';
import tables from '../constants/tables';
import knex from '../db';
import { asyncHandler } from '../utils/error-handler';
import { default_pricing as defaultPricing } from '../../prices.json';
import { v4 } from 'uuid';

export const getAllPricingModels = asyncHandler(async (ctx) =>{
	const pricingModels = await knex(tables.price)
		.select([
			`${tables.price}.name as model_name`,
			`${tables.price}.id as model_id`,
			knex.raw(`json_build_object('id', ${tables.priceConfig}.id, 'name', ${tables.priceConfig}.name, 'value', ${tables.priceConfig}.value, 'price', ${tables.priceConfig}.price) as price_config`)
		])
		.join(
			`${tables.priceConfig}`,
			`${tables.price}.id`,
			`${tables.priceConfig}.pricing_id`
		);

	ctx.status = 200;
	ctx.body = {
		status: resStatuses.success,
		data: {
			pricingModels,
			defaultPricingModels: defaultPricing
		}
	};
});

export const createPricingModel = asyncHandler(async (ctx) => {
	// TODO - Add validations for req body, params and query.
	const { name } = ctx.request.body;
	ctx.assert(name, 400, {
		status: resStatuses.error,
		message: 'Please enter valid name for pricing model.'
	});

	const [modelId] = await knex(tables.price)
		.insert({ id: v4(), name })
		.returning('id');

	ctx.assert(modelId, 500, {
		status: resStatuses.error,
		message: 'Something went wrong, could not create pricing model'
	});

	ctx.status = 201;
	ctx.body = {
		status: resStatuses.success,
		data: {
			pricingModel: {
				id: modelId
			}
		}
	};
});

export const getSinglePricingModel = asyncHandler(async (ctx) => {
	const { pmId } = ctx.params;

	const pricingModel = await knex(tables.price)
		.select([
			`${tables.price}.name as model_name`,
			`${tables.price}.id as model_id`,
			knex.raw(`json_build_object('id', ${tables.priceConfig}.id, 'name', ${tables.priceConfig}.name, 'value', ${tables.priceConfig}.value, 'price', ${tables.priceConfig}.price) as price_config`)
		])
		.where(`${tables.price}.id`, '=', pmId)
		.join(
			`${tables.priceConfig}`,
			`${tables.price}.id`,
			`${tables.priceConfig}.pricing_id`
		);

	ctx.assert(pricingModel, 404, {
		status: resStatuses.error,
		message: `Could not find pricing model with id ${pmId}`
	});

	ctx.status = 200;
	ctx.body = {
		status: resStatuses.success,
		data: {
			pricingModel
		}
	};
});
