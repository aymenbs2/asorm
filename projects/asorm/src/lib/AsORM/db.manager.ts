import {DbItemModel} from './base/db.item.model';
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import {ConstantsHelper} from './helpers/constants.helper';

PouchDB.plugin(PouchdbFind);

// @dynamic
export class DbManager {
  static instance: DbManager;
  private dbs: Array<DbItemModel>;
  private baseDb;

  constructor() {
    this.dbs = [];
  }

  public static getInstance() {
    console.clear();
    if (this.instance === undefined) {
      this.instance = new DbManager();
    }
    return this.instance;
  }

  public addDB(db: DbItemModel) {
    this.dbs.push(db);
  }

  public remove(db: any) {
    // tslint:disable-next-line:no-shadowed-variable
    this.dbs = this.dbs.filter(db => {
      return db !== db;
    });
  }

  getDBByName(name: string): DbItemModel {
    return this.dbs.find(item => item.name === name);
  }

  getAll() {
    return this.dbs;
  }

  getMasterDatabaseName() {
    return JSON.parse(window.localStorage.getItem(ConstantsHelper.CONFIG_KEY)).dbName;
  }

  getBaseDb() {
    if (this.baseDb == null || this.baseDb === undefined) {
      this.baseDb = this.createBaseDB();
    }
    return this.baseDb;
  }
  setBaseDB(value) {
    this.baseDb = value;
  }

  private createBaseDB() {

    let db: any;
    if (this.getMasterDatabaseName() !== undefined) {
      db = new PouchDB(this.getMasterDatabaseName());
      return {
        name: this.getMasterDatabaseName(),
        db
      };
    }
    return null;
  }
}


