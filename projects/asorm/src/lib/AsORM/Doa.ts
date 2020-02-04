import {DBManager} from './DBManager';
import {ThrowStmt} from '@angular/compiler';
import {IDoa} from './base/IDoa';


export function Doa(Class, name?: string) {
  return <T extends new(...args: any[]) => {}>(constructor: T) => {
    return class extends constructor implements IDoa {

      name: string;
      database: any;
      query: any = {};

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
            throw  new Error('this data not instance of ' + (new Class()).constructor.name);
          }
          const promise = await this.database.put(dataC);
          return (promise);
        } catch (e) {
          console.error(e);
        }
      }

      delete(item): any {
      }

       where(clause) {
        this.query.selector = clause;
        return this;
      }

      async apply(...args): Promise<any> {
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
    };
  };


}
