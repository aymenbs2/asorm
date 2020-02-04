import {DBItemModel} from './DBItemModel';

// @dynamic
export class DBManager {
  private static instance: DBManager;
  private dbs: Array<DBItemModel>;

  constructor() {
    this.dbs = [];
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new DBManager();
    }
    return this.instance;
  }

  public addDB(db: DBItemModel) {
    this.dbs.push(db);
  }

  public remove(db: any) {
    // tslint:disable-next-line:no-shadowed-variable
    this.dbs = this.dbs.filter(db => {
      return db !== db;
    });
  }

  getDBByName(name: string): DBItemModel {
    return this.dbs.find(item => item.name === name);
  }

  getAll() {
    return this.dbs;
  }
}

