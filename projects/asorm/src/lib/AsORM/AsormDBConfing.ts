import PouchDB from 'pouchdb';
import {DbManager} from './db.manager';

export function AsormConfig(config) {
  return <T extends new (...arg: any[]) => {}>(constructor: T) => {
    return class extends constructor {
      syncObject;


      configure() {
        this.setMasterDatabaseName();
        this.sync();
      }

      setMasterDatabaseName() {
        console.log('i config');
        if (config.masterDatabaseName) {
          DbManager.getInstance().setMasterDatabaseName(config.masterDatabaseName);
        }
      }

      sync() {
        DbManager.getInstance().getBaseDb().database = DbManager.getInstance().getBaseDb().db;
        if (DbManager.getInstance().getBaseDb().database) {
          this.syncObject = DbManager.getInstance().getBaseDb().database.sync(new PouchDB(config.url
            + '/' + DbManager.getInstance().getMasterDatabaseName()), {
            live: true,
            retry: true
          });
          return this.syncObject;
        }
      }

    };
  };
}
