const tables = require('../../constants/tables');
const config = require('../../config');

exports.up = function (knex) {
	return knex.schema.withSchema(config.dbSchema)
		.createTable(tables.price, (table) => {
			table
				.uuid('id')
				.primary()
				.notNullable();
			table
				.string('name', 255);
		});
};

exports.down = function (knex) {
	return knex.schema.withSchema(config.dbSchema)
		.dropTable(tables.price);
};
