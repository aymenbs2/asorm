import {DbItemModel} from './db.item.model';

// @dynamic
export class DbManager {
  private static instance: DbManager;
  private dbs: Array<DbItemModel>;

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
}

