import {DBManager} from './DBManager';
import {ThrowStmt} from '@angular/compiler';
import {IDoa} from './base/IDoa';
import PouchDB from 'pouchdb';

export function Doa(Class, name?: string) {
  return <T extends new (...args: any[]) => {}>(constructor: T) => {
    return class extends constructor implements IDoa {


      name: string;
      database: any;
      query: any = {selector: {}};
      sync: any;

      constructor(...args) {
        super(arguments);
        this.name = name ? name : (new Class()).constructor.name;
        this.database = DBManager.getInstance().getDBByName(this.name).db;
      }

      get(): Promise<any> {
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

      async put(dataC): Promise<any> {
        try {

          const promise = await this.database.put(dataC);
          return (promise);
        } catch (e) {
          console.error(e);
        }
      }

      async delete(doc): Promise<any> {
        return await this.database.remove(doc);
      }

      async updateWhere(field, value, operator?): Promise<any> {
        const toUpdate = await this.where(field, value, '=').apply();
        const result = [];
        for (const item of toUpdate.docs) {
          item[field] = value;
          result.push(await this.database.put(item));
        }
        return  result;
      }

      where(field: any, value: any, operator?: any) {
        this.query.selector = this.buildWhereClause(field, value, operator);
        return this;
      }

      async apply(...args): Promise<any> {
        return await this.database.find(this.query);
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

      async deleteWhere(field, value, operator?): Promise<any> {
        const toDeleteList = await this.where(field, value, operator).apply();
        const result = [];
        for (const item of toDeleteList.docs) {
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
        result[field] = (operator) ? this.getValueWithOperator(operator, value) : {$eq: value};
        return JSON.parse(JSON.stringify(result));
      }

      getValueWithOperator(operator: any, value: any): any {

        switch (operator) {
          case '<':
            return {$lt: value};
          case '>':
            return {$gt: value};
          case '<=':
            return {$lte: value};
          case '>=':
            return {$gte: value};
          case '=':
            return {$eq: value};
          case '!=':
            return {$ne: value};
          case 'in':
            return {$in: value};
          case 'like':
            return {$regex: value};
          case 'match':
            return {$elemMatch: value};
          default: {
            throw new Error('Operator not found');
          }
        }

      }
    };
  };


}
