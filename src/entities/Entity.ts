import { inject, injectable } from 'inversify';
import { Knex } from 'knex';
import types from '../config/types';

@injectable()
abstract class Entity {
  protected dbConnector: Knex;

  constructor(@inject(types.DB) dbConnector: () => Knex) {
    this.dbConnector = dbConnector();
  }
}

export default Entity;
