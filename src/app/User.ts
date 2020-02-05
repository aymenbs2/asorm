import {Entity} from 'asorm';

@Entity('aymen')
export class User {
  // tslint:disable-next-line:variable-name
  _id: any;
  note: string;
  name: string;
  shapes = [];
}
