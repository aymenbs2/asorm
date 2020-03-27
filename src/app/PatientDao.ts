import {PatientEntity} from './Patient';
import {Dao} from '../../projects/asorm/src/lib/AsORM/dao';

@Dao(PatientEntity, 'patients')
export class PatientDao {
  constructor() {
    console.log('i m doa');
  }
}
