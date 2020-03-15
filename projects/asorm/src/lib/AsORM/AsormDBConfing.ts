import PouchDB from 'pouchdb';
import { DbManager } from './db.manager';
import { ConstantsHelper } from './helpers/constants.helper';
import { AsormConfigModel } from './base/asorm.config.model';
import { MasterDoa } from './MasterDoa';


export class AsormConfig {
  private sync: any;
  private url: string;
  private dbName: string;
  private remote: any;
  private masterDao: MasterDoa;
  constructor(config: AsormConfigModel) {
    this.url = config.url;
    this.dbName = config.dbName;
    window.localStorage.setItem(ConstantsHelper.CONFIG_KEY, JSON.stringify(config));
    const pouchOpts = (config.username && config.password) ? {
      skipSetup: true,
      ajax: {
        cache: false,
        timeout: 30000
      }
      , auth: {
        username: config.username,
        password: config.password,
      }
    } :
      {
        skipSetup: true
      };
    this.remote = new PouchDB(this.url
      + '/' + this.dbName,
      pouchOpts);
    DbManager.getInstance().getBaseDb().database = DbManager.getInstance().getBaseDb().db;
  }

  synchronize() {
    if (DbManager.getInstance().getBaseDb().database) {
      this.sync = DbManager.getInstance().getBaseDb().database.sync(this.remote, {
        live: true,
        retry: true
      }
      )
        ;
      return this.sync;
    }
  }

  getMasterDao() {
    if (this.masterDao == undefined) {
      this.masterDao = new MasterDoa(DbManager.getInstance().getBaseDb().database);
    }
    return this.masterDao;
  }
}
