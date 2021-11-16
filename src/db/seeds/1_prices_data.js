const config = require('../../config');
const tables = require('../../constants/tables');

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tables.price).withSchema(config.dbSchema).del()
		.then(function () {
			// Inserts seed entries
			return knex(tables.price).withSchema(config.dbSchema).insert([
				{
					id: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
					name: 'Super Value Option'
				},
				{
					id: '4d40de8f-68f8-4160-a83a-665dbc92d154',
					name: 'Default'
				},
				{
					id: '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e',
					name: 'Long Play'
				}
			]);
		});
};
