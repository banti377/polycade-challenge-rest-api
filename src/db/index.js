
const dbConfig = require('./knexfile');
const _knex = require('knex');

const knex = _knex(process.env.NODE_ENV === 'test' ? dbConfig.test : dbConfig.development);

module.exports = knex;
