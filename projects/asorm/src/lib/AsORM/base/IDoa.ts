export interface IDoa {
  get(...args): any;

  put(...args): any;

  delete(...args): any;

  select(...args): any;

  where(...args): any;

  orderBy(...args): any;

  limit(...args): any;

  apply(...args): any;

  sync(...args): any;

  deleteWhere(...args): any;

  updateWhere(...args): any;
}
