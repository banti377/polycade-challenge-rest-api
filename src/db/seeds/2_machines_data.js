/* eslint-disable camelcase */
const config = require('../../config');
const tables = require('../../constants/tables');

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex(tables.machine).withSchema(config.dbSchema).del()
		.then(function () {
			// Inserts seed entries
			return knex(tables.machine).withSchema(config.dbSchema).insert([{
				id: '99ade105-dee1-49eb-8ac4-e4d272f89fba',
				name: 'Machine 1',
				pricing_id: '3ba92095-3203-4888-a464-3c7d5d9acd7e'
			},
			{
				id: '4111947a-6c58-4977-90fa-2caaaef88648',
				name: 'Machine 2',
				pricing_id: null
			},
			{
				id: '57342663-909c-4adf-9829-6dd1a3aa9143',
				name: 'Machine 3',
				pricing_id: '48e7d94d-a9ea-4fb2-a458-b2e2be6d3a6e'
			},
			{
				id: '5632e1ec-46cb-4895-bc8b-a91644568cd5',
				name: 'Machine 4',
				pricing_id: '4d40de8f-68f8-4160-a83a-665dbc92d154'
			}]);
		});
};
