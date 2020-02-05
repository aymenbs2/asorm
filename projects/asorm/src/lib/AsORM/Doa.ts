import { DBManager } from './DBManager';
import { ThrowStmt } from '@angular/compiler';
import { IDoa } from './base/IDoa';


export function Doa(Class, name?: string) {
  return <T extends new (...args: any[]) => {}>(constructor: T) => {
    return class extends constructor implements IDoa {
      like(...args: any[]) {
        throw new Error("Method not implemented.");
      }
      match(...args: any[]) {
        throw new Error("Method not implemented.");
      }

      name: string;
      database: any;
      query: any = { selector: {} };

      constructor(...args) {
        super(arguments);
        this.name = name ? name : (new Class()).constructor.name;
        console.log(DBManager.getInstance().getAll());
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

      async put(dataC): Promise<any> {
        try {
          if ((new Class()).constructor.name !== dataC.constructor.name) {
            throw new Error('this data not instance of ' + (new Class()).constructor.name);
          }
          const promise = await this.database.put(dataC);
          return (promise);
        } catch (e) {
          console.error(e);
        }
      }

      delete(item): any {
      }

      where(field: any, operator: any, value: any) {
        this.query.selector = this.buildClause(field, operator, value);

        return this;
      }

      async apply(...args): Promise<any> {
        console.log("query is ", this.query)
        return await this.database.find(this.query);
      }

      orderBy(clause): any {
        this.query.sort = clause;
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


      buildClause(field: any, operator, value) {
        let result = {}
        result[field] = this.getValueWithOperatot(operator, value);
        console.log(result)
        return JSON.parse(JSON.stringify(result));
      }
      getValueWithOperatot(operator: any, value: any): any {
        switch (operator) {
          case '<': {
            return { $lt: value }

          }
          case '>': {
            return { $gt: value }

          }
          case '<=': {
            return { $lte: value }

          }
          case '>=': {
            return { $gte: value }

          }
          case '=': {
            return {
              $eq: value
            }

          }
          case '!=': {
            return {
              $ne: value
            }

          }
          case 'in': {
            return {
              $in: value
            }

          }
          case 'like': {
            return {
              $regex: value
            }

          }
          case 'match': {
            return {
              $elemMatch: value
            }

          }
          default: {
            return {
              $eq: value
            }
          }
        }

      }
    };
  };


}
