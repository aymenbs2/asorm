export abstract class IDao {

  abstract get(...args): any;

  abstract put(...args): any;

  abstract delete(...args): any;

  abstract select(...args): any;

  abstract where(...args): any;

  abstract orderBy(...args): any;

  abstract limit(...args): any;

  abstract apply(...args): any;

  abstract first(...args): any;

  abstract sync(...args): any;

  abstract deleteWhere(...args): any;

  abstract updateWhere(...args): any;

  abstract set(...args): any;

  abstract orWhere(...args): any;
}
