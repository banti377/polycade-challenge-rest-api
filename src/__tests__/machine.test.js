const request = require('supertest');
const app = require('../index');
const { resStatuses } = require('../constants');
const { v4 } = require('uuid');

const BASE_URL = '/machines';

describe('test machines endpoints', () => {
	afterAll(async () => {
		// Close server after all tests are executed.
		await app.close();
	});

	const validMachineId = '99ade105-dee1-49eb-8ac4-e4d272f89fba';
	const validPricinModelId = '4d40de8f-68f8-4160-a83a-665dbc92d154';

	// For endpointr PUT /machines/:machine-id/prices/:pm-id
	describe('machine update endpoints', () => {
		it('should update pricing model for machine', async (done) => {
			const res = await request(app.listen()).put(`${BASE_URL}/${validMachineId}/prices/${validPricinModelId}`);

			expect(res.status).toEqual(200);

			done();
		});

		it('should throw 404 for invalid pricing model id', async (done) => {
			const res = await request(app.listen()).put(`${BASE_URL}/${validMachineId}/prices/${v4()}`);

			expect(res.status).toEqual(404);
			expect(res.body.status).toEqual(resStatuses.error);

			done();
		});

		it('should throw 404 for invalid machine id', async (done) => {
			const res = await request(app.listen()).put(`${BASE_URL}/${v4()}/prices/${validPricinModelId}`);

			expect(res.status).toEqual(404);
			expect(res.body.status).toEqual(resStatuses.error);

			done();
		});
	});


	// For endpoint GET /machines/:machine-id/prices
	describe('get machine\'s price configs.', () => {
		it('should get machine price configs based on id', async (done) => {
			const res = await request(app.listen()).get(`${BASE_URL}/${validMachineId}/prices`);

			expect(res.status).toEqual(200);
			expect(res.body.status).toEqual(resStatuses.success);
			expect(res.body.data.pricingModel).toBeTruthy();

			done();
		});

		it('should throw 404 for invalid machine id', async (done) => {
			const res = await request(app.listen()).get(`${BASE_URL}/${v4()}/prices`);

			expect(res.status).toEqual(404);
			expect(res.body.status).toEqual(resStatuses.error);

			done();
		});
	});


	// For endpoint DELETE /machines/:machine-id/prices/:pm-id
	it('should remove pricing model from machine', async (done) => {
		const res = await request(app.listen()).del(`${BASE_URL}/${validMachineId}/prices/${validPricinModelId}`);

		expect(res.status).toEqual(200);
		expect(res.body.status).toEqual(resStatuses.success);

		done();
	});
});
