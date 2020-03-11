import {DbManager} from './db.manager';
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';

PouchDB.plugin(PouchdbFind);

export function Entity(name?: string) {
  return <T extends new(...args: any[]) => {}>(constructor: T) => {
    let db: any;
    const chosenName = name ? name : constructor.name;
    console.log('het ', constructor.name);
    if ((Object.getPrototypeOf(constructor) + '').includes('BaseEntity')) {
      //DbManager.getInstance().getBaseDb();
    } else {
      if (DbManager.getInstance().getDBByName(chosenName) == null) {
        db = new PouchDB(chosenName);
        DbManager.getInstance().addDB({
          name: chosenName,
          db
        });
      }
    }
    return constructor;
  };
}

