/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index');
const { resStatuses } = require('../constants');
const { v4 } = require('uuid');

const BASE_URL = '/pricing-models';

describe('Pricing model tests.', () => {
	// From seed
	const validPriceUUID = '3ba92095-3203-4888-a464-3c7d5d9acd7e';
	// Generate invalid uuid to test 404.
	const invalidUUID = '3ba92095-3203-4888-a464-3c7d5d9acd7f';

	afterAll(async () => {
		await app.close();
	});

	// For endpoint GET /pricing-models
	it('should get all pricing models and default pricing model.', async (done) => {
		const res = await request(app.listen()).get(BASE_URL);

		expect(res.status).toEqual(200);
		expect(res.body.status).toEqual(resStatuses.success);
		expect(res.body.data.pricingModels).toBeTruthy();
		expect(res.body.data.defaultPricingModels).toBeTruthy();

		done();
	});

	// For endpoint POST /pricing-models
	it('should add new pricing model.', async (done) => {
		const pricingData = {
			id: v4(),
			name: 'test'
		};
		const res = await request(app.listen()).post(BASE_URL).send({ ...pricingData });

		expect(res.status).toEqual(201);
		expect(res.body.status).toEqual(resStatuses.success);
		expect(res.body.data.pricingModel.id).toBeTruthy();

		done();
	});


	// For endpoint GET /pricing-models/:id
	describe('tests for getting individual pricing models', () => {
		it('should get individual pricing model', async (done) => {
			const res = await request(app.listen()).get(`${BASE_URL}/${validPriceUUID}`);

			expect(res.status).toEqual(200);
			expect(res.body.status).toEqual(resStatuses.success);
			expect(res.body.data.pricingModel).toBeTruthy();
			expect(res.body.data.pricingModel.priceconfig).toBeTruthy();

			done();
		});

		it('should throw 404 for invalid uuid of pricing model.', async (done) => {
			const res = await request(app.listen()).get(`${BASE_URL}/${invalidUUID}`);

			expect(res.status).toEqual(404);
			expect(res.body.status).toEqual(resStatuses.error);

			done();
		});
	});


	// For endpoint PUT /pricing-models/:id
	describe('tests for updating pricing models', () => {
		it('should update pricing model', async (done) => {
			const res = await request(app.listen()).put(`${BASE_URL}/${validPriceUUID}`).send({
				name: 'updated name'
			});

			expect(res.status).toEqual(200);
			expect(res.body.status).toEqual(resStatuses.success);

			done();
		});

		it('should throw 404 for invalid uuid of pricing model.', async (done) => {
			const res = await request(app.listen()).put(`${BASE_URL}/${invalidUUID}`).send({
				name: 'new name'
			});

			expect(res.status).toEqual(404);
			expect(res.body.status).toEqual(resStatuses.error);

			done();
		});
	});


	// For endpoint GET /pricing-models/:pmId/prices
	it('should get price configs for given price model', async (done) => {
		const res = await request(app.listen()).get(`${BASE_URL}/${validPriceUUID}/prices`);

		expect(res.status).toEqual(200);
		expect(res.body.status).toEqual(resStatuses.success);
		expect(res.body.data.priceConfig).toBeTruthy();

		done();
	});
});
