import {AsormConfig, Entity} from 'asorm';
import {BaseEntity} from 'asorm';

@Entity('patients')
export class PatientEntity extends BaseEntity {
  _id: string;
  name: string;
}
