export class OperatorHelper {
  public static getValueWithOperator(operator: any, value: any): any {

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

  public static getEqualOperator(value) {
    return {$eq: value};
  }
}
