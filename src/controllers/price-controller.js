import { resStatuses } from '../constants';
import tables from '../constants/tables';
import knex from '../db';
import { asyncHandler } from '../utils/error-handler';
import { default_pricing as defaultPricing } from '../../prices.json';
import { v4 } from 'uuid';

export const getAllPricingModels = asyncHandler(async (ctx) =>{
	const pricingModels = await knex(tables.price)
		.select([
			`${tables.price}.name`,
			`${tables.price}.id`,
			knex.raw(`
        array_agg(
          case
            when ${tables.priceConfig}.id IS NOT NULL then json_build_object('id', ${tables.priceConfig}.id, 'name', ${tables.priceConfig}.name, 'value', ${tables.priceConfig}.value, 'price', ${tables.priceConfig}.price)
            else null
          end
        ) filter (where ${tables.priceConfig}.id is not null) as pricing
      `)
		])
		.leftJoin(
			`${tables.priceConfig}`,
			`${tables.price}.id`,
			`${tables.priceConfig}.pricing_id`
		)
		.groupBy([`${tables.price}.name`, `${tables.price}.id`]);

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

	const [pricingModel] = await knex(tables.price)
		.select([
			`${tables.price}.name as model_name`,
			`${tables.price}.id as model_id`,
			knex.raw(`
        array_agg(
          case
            when ${tables.priceConfig}.id IS NOT NULL then json_build_object('id', ${tables.priceConfig}.id, 'name', ${tables.priceConfig}.name, 'value', ${tables.priceConfig}.value, 'price', ${tables.priceConfig}.price)
            else null
          end
        ) filter (where ${tables.priceConfig}.id is not null) as pricing
      `)
		])
		.where(`${tables.price}.id`, '=', pmId)
		.leftJoin(
			`${tables.priceConfig}`,
			`${tables.price}.id`,
			`${tables.priceConfig}.pricing_id`
		)
		.groupBy(['model_name', 'model_id']);

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

export const updatePricingModel = asyncHandler(async (ctx) => {
	const { pmId } = ctx.params;
	const { name } = ctx.request.body;

	const updatedPricingModel = await knex(tables.price)
		.where('id', '=', pmId)
		.update({ 'name': name });

	ctx.assert(updatedPricingModel, 404, {
		status: resStatuses.error,
		message: `Could not find pricing model with id ${pmId}`
	});

	ctx.status = 200;
	ctx.body = {
		status: resStatuses.success
	};
});

export const getPriceConfig = asyncHandler(async (ctx) => {
	const { pmId } = ctx.params;

	const [price] = await knex(tables.price)
		.where(`${tables.price}.id`, '=', pmId);

	ctx.assert(price, 404, {
		status: resStatuses.error,
		message: `Could not find price config for price model ${pmId}`
	});

	const priceConfig = await knex(tables.price)
		.select([`${tables.priceConfig}.*`])
		.where(`${tables.price}.id`, '=', pmId)
		.leftJoin(
			`${tables.priceConfig}`,
			`${tables.price}.id`,
			`${tables.priceConfig}.pricing_id`
		);



	ctx.status = 200;
	ctx.body = {
		status: resStatuses.success,
		data: {
			priceConfig
		}
	};
});

export const createPriceConfig = asyncHandler(async (ctx) => {
	const { pmId } = ctx.params;
	const { name, price, value } = ctx.request.body;

	const [priceModel] = await knex(tables.price)
		.where('id', '=', pmId);

	ctx.assert(priceModel, 404, {
		status: resStatuses.error,
		message: `Could not find pricing model for id ${pmId}`
	});

	const priceConfig = await knex(tables.priceConfig)
		.insert({
			id: v4(),
			name,
			price,
			value,
			// eslint-disable-next-line camelcase
			pricing_id: pmId
		});

	ctx.assert(priceConfig, 500, {
		status: resStatuses.error,
		message: `Something went wrong, could not create price config for model id ${pmId}`
	});

	ctx.status = 201;
	ctx.body = {
		status: resStatuses.success
	};
});

export const removePriceConfig = asyncHandler(async (ctx) => {
	const { pmId, priceId } = ctx.params;

	const [priceModel] = await knex(tables.price)
		.where('id', '=', pmId);

	ctx.assert(priceModel, 404, {
		status: resStatuses.error,
		message: `Pricing model with id ${pmId} not found`
	});

	const [priceConfig] = await knex(tables.priceConfig)
		.where('id', '=', priceId);

	ctx.assert(priceConfig, 404, {
		status: resStatuses.error,
		message: `Price config with id ${priceId} not found`
	});

	await knex(tables.priceConfig)
		.where('pricing_id', '=', pmId)
		.andWhere('id', '=', priceId)
		.update({
			// eslint-disable-next-line camelcase
			pricing_id: null
		});

	ctx.status = 200;
	ctx.body = {
		status: resStatuses.success
	};
});
