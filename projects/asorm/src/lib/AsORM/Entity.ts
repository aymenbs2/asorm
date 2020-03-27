import {DbManager} from './db.manager';
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';


export function Entity(name?: string) {
  return <T extends new(...args: any[]) => {}>(constructor: T) => {
    PouchDB.plugin(PouchdbFind);
    let db: any;
    const chosenName = name ? name : constructor.name;
    if ((Object.getPrototypeOf(constructor) + '').includes('BaseEntity')) {
    //  DbManager.getInstance().getBaseDb();
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
  }
    ;
}

