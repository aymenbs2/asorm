import PouchDB from 'pouchdb';
import {DbManager} from './db.manager';
import {ConstantsHelper} from './helpers/constants.helper';
import {AsormConfigModel} from './base/asorm.config.model';
import {MasterDoa} from './master.doa';
import PouchdbFind from 'pouchdb-find';
PouchDB.plugin(PouchdbFind);
export class AsormConfig {
  private sync: any;
  private url: string;
  private dbName: string;
  private remote: any;
  private masterDao: MasterDoa;

  constructor(config: AsormConfigModel) {
    try {
      this.url = config.url;
      this.dbName = config.dbName;
      localStorage.setItem(ConstantsHelper.CONFIG_KEY, JSON.stringify(config));
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
    } catch (err) {
      console.log(err);
    }
  }

  synchronize(options?) {
    try {
      if (DbManager.getInstance().getBaseDb().database) {
        this.sync = DbManager.getInstance().getBaseDb().database.sync(this.remote, (!options) ? {
            live: true,
            retry: true
          } : options
        )
        return this.sync;
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  getMasterDao() {
    if (this.masterDao === undefined) {
      this.masterDao = new MasterDoa(DbManager.getInstance().getBaseDb().database);
    }
    return this.masterDao;
  }
}
