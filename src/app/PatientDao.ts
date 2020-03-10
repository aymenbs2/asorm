import {PatientEntity} from './Patient';
import {Dao} from '../../projects/asorm/src/lib/asorm/dao';

@Dao(PatientEntity, 'patients')
export class PatientDao {

}
