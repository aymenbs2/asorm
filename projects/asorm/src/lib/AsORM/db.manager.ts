import {DbItemModel} from './base/db.item.model';
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';

PouchDB.plugin(PouchdbFind);

// @dynamic
export class DbManager {
  private static instance: DbManager;
  private dbs: Array<DbItemModel>;
  private baseDb;
  private database: any;
  private masterSync: any;
  private masterDatabaseName: string;

  constructor() {
    this.dbs = [];
  }

  public static getInstance() {
    if (this.instance == null) {
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
    if (this.masterDatabaseName === '' || this.masterDatabaseName == null || this.masterDatabaseName === undefined) {
      this.masterDatabaseName = 'baseDBAsORM';
    }
    return this.masterDatabaseName;
  }

  setMasterDatabaseName(name) {
    this.masterDatabaseName = name;
  }

  getBaseDb() {
    console.log(this.baseDb === undefined);
    if (this.baseDb == null || this.baseDb === undefined) {
      this.baseDb = this.createBaseDB();
    }

    return this.baseDb;
  }

  setBaseDB(value) {
    this.baseDb = value;
  }


  private createBaseDB() {
    const chosenName = this.getMasterDatabaseName();
    const db = new PouchDB(chosenName);
    return {
      name: chosenName,
      db
    };
  }
}

