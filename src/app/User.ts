import {Entity} from 'asorm';
import {BaseEntity} from 'asorm';

@Entity('aymen')
export class User extends BaseEntity {
  // tslint:disable-next-line:variable-name
  _id: any;
  note: string;
  name: string;
  shapes = [];
}
