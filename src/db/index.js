
const dbConfig = require('./knexfile');
const _knex = require('knex');

const knex = _knex(dbConfig.development);

module.exports = knex;
