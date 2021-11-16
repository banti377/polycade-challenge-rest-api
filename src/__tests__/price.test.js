/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index');
const { resStatuses } = require('../constants');
const { v4 } = require('uuid');

const BASE_URL = '/pricing-models';

describe('Pricing model tests.', () => {
	afterAll(async () => {
		await app.close();
	});

	it('should get all pricing models and default pricing model.', async (done) => {
		const res = await request(app.listen()).get(BASE_URL);

		expect(res.status).toEqual(200);
		expect(res.body.status).toEqual(resStatuses.success);
		expect(res.body.data.pricingModels).toBeTruthy();
		expect(res.body.data.defaultPricingModels).toBeTruthy();

		done();
	});

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

	describe('tests for getting individual pricing models', () => {
		// From seed.
		const validPriceUUID = '3ba92095-3203-4888-a464-3c7d5d9acd7e';
		// Generate invalid uuid to test 404.
		const invalidUUID = '3ba92095-3203-4888-a464-3c7d5d9acd7f';

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
});
