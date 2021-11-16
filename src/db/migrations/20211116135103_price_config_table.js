const tables = require('../../constants/tables');
const config = require('../../config');

exports.up = function (knex) {
	return knex.schema.withSchema(config.dbSchema)
		.createTable(tables.priceConfig, (table) => {
			table
				.uuid('id')
				.primary()
				.notNullable();
			table
				.string('name', 255);
			table
				.integer('price');
			table
				.integer('value');
			table
				.foreign('pricing_id')
				.references('id')
				.inTable(`${config.dbSchema}.${tables.price}`)
				.onDelete('CASCADE');
			table
				.uuid('pricing_id');
		});
};

exports.down = function (knex) {
	return knex.schema.withSchema(config.dbSchema)
		.dropTable(tables.priceConfig);
};
