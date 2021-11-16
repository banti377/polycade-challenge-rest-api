
import { dbConfig } from './knexfile';
import _knex from 'knex';

export const knex = _knex(dbConfig.development);
