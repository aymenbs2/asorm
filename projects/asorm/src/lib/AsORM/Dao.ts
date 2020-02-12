import {DbManager} from './db.manager';
import {ThrowStmt} from '@angular/compiler';
import {IDao} from './base/i.dao';
import PouchDB from 'pouchdb';
import {ICallback} from './base/i.callback';
import {OperatorHelper} from './Helpers/OperatorHelper';

export function Dao(Class, name?: string) {


  return <T extends new (...args: any[]) => {}>(constructor: T) => {
    return class extends constructor implements IDao {


      name: string;
      database: any;
      query: any = {selector: {}};
      sync: any;

      constructor(...args) {
        super(arguments);
        this.name = name ? name : (new Class()).constructor.name;
        this.database = DbManager.getInstance().getDBByName(this.name).db;
      }

      async get(callback?: ICallback): Promise<any> {
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
      }

      getDocsWithCallBack(callback: ICallback) {
        return new Promise(async resolve => {
          try {
            const docs = await this.database.allDocs({
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
        this.sync = this.database.sync(new PouchDB(url));
        return this.sync;
      }

      async put(data, callback?): Promise<any> {
        try {

          const promise = await this.database.put(data);
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

      async updateWhere(field, value, operator?, callback?): Promise<any> {
        if (!callback) {
          const toUpdate = await this.where(field, value, operator).apply();
          return await this.updateAndGetResult(toUpdate, field, value);
        }
        this.updateWithCallBack(field, value, operator, callback);
      }


      async updateWithCallBack(field: string | number, value: any, operator?: any, callback?: ICallback) {
        if (callback.onPreExecute) {
          callback.onPreExecute();
        }
        const toUpdate = await this.where(field, value, operator).apply();
        const result = [];
        try {
          for (const item of toUpdate) {
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
        if (callback.onPreExecute) {
          callback.onPreExecute();
        }
        const toDelete = await this.where(field, value, operator).apply();
        const result = [];
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

      async updateAndGetResult(toUpdate, field, value) {
        const result = [];
        for (const item of toUpdate.docs) {
          item[field] = value;
          result.push(await this.database.put(item));
        }
        return result;
      }

      where(field: any, value: any, operator?: any) {
        this.query.selector = this.buildWhereClause(field, value, operator);
        return this;
      }

      async apply(callback?: ICallback): Promise<any> {
        let result;
        if (!callback) {
          result = await this.database.find(this.query);
          return result.docs;
        }
        await this.applyWithCallBack(callback);
      }

      async applyWithCallBack(callback: ICallback) {
        if (callback.onPreExecute) {
          callback.onPreExecute();
        }
        const result = await this.database.find(this.query);
        if (result.docs > 0) {
          callback.onSuccess(result.docs);
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
