const { v4 } = require('uuid');
const config = require('../../config');
const tables = require('../../constants/tables');

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tables.priceConfig).withSchema(config.dbSchema).del()
		.then(function () {
			// Inserts seed entries
			return knex(tables.priceConfig).withSchema(config.dbSchema).insert([
				{
					id: v4(),
					price: 3,
					name: '10 minutes',
					value: 10,
					pricing_id: '3ba92095-3203-4888-a464-3c7d5d9acd7e'
				},
				{
					id: v4(),
					price: 5,
					name: '20 minutes',
					value: 20,
					pricing_id: '3ba92095-3203-4888-a464-3c7d5d9acd7e'
				},
				{
					id: v4(),
					price: 3,
					name: '10 minutes',
					value: 10,
					pricing_id: '4d40de8f-68f8-4160-a83a-665dbc92d154'
				},
				{
					id: v4(),
					price: 5,
					name: '20 minutes',
					value: 20,
					pricing_id: '4d40de8f-68f8-4160-a83a-665dbc92d154'
				},
				{
					id: v4(),
					price: 15,
					name: '60 minutes',
					value: 60,
					pricing_id: '4d40de8f-68f8-4160-a83a-665dbc92d154'
				},
				{
					id: v4(),
					price: 15,
					name: '60 minutes',
					value: 60,
					pricing_id: '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e'
				}
			]);
		});
};
