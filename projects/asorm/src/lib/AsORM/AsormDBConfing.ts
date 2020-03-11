import PouchDB from 'pouchdb';
import {DbManager} from './db.manager';
import {IDao} from './base/i.dao';
import {ConstantsHelper} from './helpers/constants.helper';
import {AsormConfigModel} from './base/asorm.config.model';

export class AsormConfig {
  private sync: any;
  private url: string;
  private dbName: string;

  constructor(config: AsormConfigModel) {
    this.url = config.url;
    this.dbName = config.dbName;
    window.localStorage.setItem(ConstantsHelper.CONFIG_KEY, JSON.stringify(config));
  }

  synchronize() {
    DbManager.getInstance().getBaseDb().database = DbManager.getInstance().getBaseDb().db;
    if (DbManager.getInstance().getBaseDb().database) {
      this.sync = DbManager.getInstance().getBaseDb().database.sync(new PouchDB(this.url
        + '/' + this.dbName), {
        live: true,
        retry: true
      });
      return this.sync;
    }
  }

}
