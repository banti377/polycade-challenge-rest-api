/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../index');
const { resStatuses } = require('../constants');

const BASE_URL = '/pricing-models';

describe('Pricing model tests', () => {
	it('should get all pricing models', async (done) => {
		const res = await request(app.listen()).get(BASE_URL);

		expect(res.status).toEqual(200);
		expect(res.body.status).toEqual(resStatuses.success);
		expect(res.body.data.pricingModels).toBeTruthy();
		expect(res.body.data.defaultPricingModels).toBeTruthy();

		done();
	});
});
