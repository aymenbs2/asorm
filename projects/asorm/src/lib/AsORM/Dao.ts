import {DbManager} from './db.manager';
import {ThrowStmt} from '@angular/compiler';
import {IDao} from './base/i.dao';
import PouchDB from 'pouchdb';
import {ICallback} from './base/i.callback';
import {OperatorHelper} from './helpers/OperatorHelper';
import {AttachementManager} from './attachment/attachement.manager';

export function Dao(Class, name?: string) {


  return <T extends new (...arg: any[]) => {}>(constructor: T) => {
    return class extends constructor implements IDao {


      tableName: string;
      database: any;
      query: any = {selector: {}};
      sync: any;
      replication: any;
      whereRes: any;
      public attchementManager: AttachementManager;
      isFromBase: boolean;

      constructor(...args) {
        super(arguments);
        this.tableName = name ? name : (new Class()).constructor.name;
        this.isFromBase = (Object.getPrototypeOf((new Class()).constructor ) + '').includes('BaseEntity');
        this.database = this.isFromBase ? DbManager.getInstance().getBaseDb().db : DbManager.getInstance().getDBByName(this.tableName).db;
      }

      async get(callback?: ICallback): Promise<any> {
        if (!this.isFromBase) {
          if (!callback) {
            return this.getDocsInPromise();
          }
          if (callback.onPreExecute) {
            callback.onPreExecute();
          }
          await this.getDocsWithCallBack(callback);
          if (callback.onPostExecute) {
            callback.onPostExecute();
          }
          return;
        }
        const where = this.where('table', this.tableName, '=');
        if (!callback) {
          return where.apply();
        } else {
          where.apply(callback);
        }
      }

      getDocsWithCallBack(callback: ICallback) {
        return new Promise(async resolve => {
          let docs: any;
          try {
            docs = await this.database.allDocs({
              include_docs: true,
              attachments: true
            });
            docs.rows = docs.rows.map(item => {
              return item.doc;
            });
            resolve(docs.rows);
            if (docs.rows.length > 0) {
              callback.onSuccess(docs.rows);
            } else {
              if (callback.onEmpty) {
                callback.onEmpty();
              }
            }

          } catch (e) {
            callback.onError(e);
          }

        });
      }

      getDocsInPromise() {
        return new Promise(async resolve => {
          const docs = await this.database.allDocs({
            include_docs: true,
            attachments: true
          });
          docs.rows = docs.rows.map(item => {
            return item.doc;
          });
          resolve(docs.rows);
          return docs.rows;
        });
      }

      syncWith(url) {
        this.sync = this.database.sync(new PouchDB(url), {
          live: true,
          retry: true
        });
        return this.sync;
      }

      replicateTo(url) {
        this.replication = this.database.replicate.to(new PouchDB(url), {
          live: true,
          retry: true
        });
        return this.replication;
      }

      replicateFrom(url) {
        this.replication = this.database.replicate.from(new PouchDB(url), {
          live: true,
          retry: true
        });
        return this.replication;
      }

      async put(data, callback?): Promise<any> {
        if (!this.isFromBase) {
          let promise;
          try {
            if (data instanceof Array) {
              promise = await this.database.bulkDocs(data);
            } else {
              promise = await this.database.put(data);
            }
            return (promise);
          } catch (e) {
            console.error(e);
          }
          return;
        } else {
          this.putBaseMode(data, callback);
        }

      }

      async putBaseMode(data, callback?) {
        let promise;
        try {
          if (data instanceof Array) {
            data = data.map(item => {
              Object.assign(item, {table: this.tableName});
              return item;
            });
            promise = await this.database.bulkDocs(data);
          } else {
            Object.assign(data, {table: this.tableName});
            promise = await this.database.put(data);
          }
          return (promise);
        } catch (e) {
          console.error(e);
        }
      }

      async delete(doc, callback?: ICallback): Promise<any> {
        if (!callback) {
          return await this.database.remove(doc);
        }
        this.deleteWithCallBack(doc, callback);
      }

      async updateWhere(field, value, operator?, callback?) {
        if (!callback) {
          this.whereRes = await this.where(field, value, operator).apply();
          //  return await this.updateAndGetResult(toUpdate, newData, field, value);
        }
        //  this.updateWithCallBack(field, value, operator, callback);
        return this;
      }

      async set(newObjects) {
        let item;
        const result = [];
        for (item of this.whereRes) {
          Object.assign(item, newObjects);
          result.push(await this.database.put(item));
        }
        return result;
      }

      async updateWithCallBack(field: string | number, value: any, operator?: any, callback?: ICallback) {
        let item;
        let result: any[];
        let toUpdate: any;
        if (callback.onPreExecute) {
          callback.onPreExecute();
        }
        toUpdate = await this.where(field, value, operator).apply();
        result = [];
        try {
          for (item of toUpdate) {
            item[field] = value;
            result.push(await this.database.put(item));
          }
          callback.onSuccess(result);
        } catch (e) {
          callback.onError(e);
        }
        if (callback.onPostExecute) {
          callback.onPostExecute();
        }
        return result;
      }

      async deleteWhereWithCallBack(field: string | number, value: any, operator?: any, callback?: ICallback) {
        let result: any[];
        let toDelete: any;
        if (callback.onPreExecute) {
          callback.onPreExecute();
        }
        toDelete = await this.where(field, value, operator).apply();
        result = [];
        try {
          for (const item of toDelete) {
            item[field] = value;
            result.push(await this.delete(item));
          }
          callback.onSuccess(result);
        } catch (e) {
          callback.onError(e);
        }
        if (callback.onPostExecute) {
          callback.onPostExecute();
        }
        return result;
      }

      async updateAndGetResult(toUpdate, newData, field, value) {
        let item;
        const result = [];
        for (item of toUpdate) {
          item[field] = newData;
          result.push(await this.database.put(item));
        }
        return result;
      }

      where(field: any, value: any, operator?: any) {
        Object.assign(this.query.selector, this.buildWhereClause(field, value, operator));
        return this;
      }

      async first(callback?: ICallback): Promise<any> {
        let result;
        if (!callback) {
          result = await this.database.find(this.query);
          return result.docs[0];
        }
        await this.applyWithCallBack(callback, true);
      }

      async apply(callback?: ICallback): Promise<any> {
        let result;
        if (this.isFromBase) {
          this.where('table', this.tableName, '=');
        }
        if (!callback) {
          result = await this.database.find(this.query);
          return result.docs;
        }
        await this.applyWithCallBack(callback, false);
      }

      async applyWithCallBack(callback: ICallback, isFirst: boolean) {

        if (callback.onPreExecute) {
          callback.onPreExecute();
        }
        const result = await this.database.find(this.query);
        if (result.docs.length > 0) {
          if (isFirst) {
            callback.onSuccess(result.docs[0]);
          } else {
            callback.onSuccess(result.docs);
          }

        } else {
          if (callback.onEmpty) {
            callback.onEmpty();
          }
        }

        if (callback.onPostExecute) {
          callback.onPostExecute();
        }
        return result;
      }

      orderBy(field, order?): any {
        this.query.sort = this.buildOrderByClause(field, order);
        return this;
      }

      select(fields): any {
        this.query.fields = fields;
        return this;
      }

      limit(limit: number): any {
        this.query.limit = limit;
        return this;
      }

      async deleteWhere(field, value, operator?, callback?: ICallback): Promise<any> {
        if (!callback) {
          return await this.deleteWhereAndGetResult(field, value, operator);
        }
        this.deleteWhereWithCallBack(field, value, operator, callback);
      }

      async deleteWhereAndGetResult(field, value, operator) {
        const toDeleteList = await this.where(field, value, operator).apply();
        const result = [];
        for (const item of toDeleteList) {
          result.push(await this.delete(item));
        }
        return result;
      }

      buildOrderByClause(field, order?) {
        const result = {};
        result[field] = (order) ? order : 'asc';
        return JSON.parse(JSON.stringify([result]));
      }

      buildWhereClause(field: any, value, operator?) {
        const result = {};
        result[field] = (operator) ? OperatorHelper.getValueWithOperator(operator, value) : OperatorHelper.getEqualOperator(value);
        return JSON.parse(JSON.stringify(result));
      }

      async deleteWithCallBack(doc: any, callback: ICallback) {
        if (callback.onPreExecute) {
          callback.onPreExecute();
        }
        try {
          callback.onSuccess(await this.database.remove(doc));
        } catch (e) {
          callback.onError(e);
        }
        if (callback.onPostExecute) {
          callback.onPostExecute();
        }
      }
    };
  };


}
