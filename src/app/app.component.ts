import {Component} from '@angular/core';
import {ExampleLibDao} from './ExampleLibDao';
import {User} from './User';
import {Callback} from './callback';
import {AttachmentTypes} from 'asorm';
import {compileSourceFiles} from 'ng-packagr';
import {error} from 'ng-packagr/lib/util/log';
import {MD5Helper} from '../../projects/asorm/src/lib/asorm/helpers/MD5Helper';
import {PatientDao} from './PatientDao';
import {PatientEntity} from './Patient';
import {ConfigAsorm} from './Config';

const global = window;

@Component({
  selector: 'app-root',
  template: '<h1> AsORM</h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static instance: AppComponent;
  title = 'AsORM';
  exampleLibDoa: any;
  patientDoa: any;
  config;

  constructor() {
    this.createDoa();
    document.addEventListener('click', () => {
      console.log('clikc');
      this.addOnEnter();
    });
    AppComponent.instance = this;
  }


  static getInstance() {
    return this.instance;
  }

  createDoa() {
    this.config = new ConfigAsorm();

    this.exampleLibDoa = new ExampleLibDao();
    this.patientDoa = new PatientDao();
  }

  async addOnEnter() {
    //this.exampleLibDoa.replicateFrom('http://localhost:5984/user').on('change', (changes) => {
    //});
    this.config.configure();
    let user = new User();
    const patient = new PatientEntity();
    patient._id = new Date().getTime() + '';
    patient.name = 'haithompa';
    user._id = new Date().getTime() + '1' + '';
    user.name = 'haithomsuer';
    await this.exampleLibDoa.put(user);
    await this.patientDoa.put(patient);

    await this.patientDoa.where('name', 'haithompa', 'like').apply({
      onSuccess: (data) => {
        console.log(data);

      },
      onError: (e) => {

      }
    });
    await this.exampleLibDoa.where('name', 'haith', 'like').apply({
      onSuccess: (data) => {
        console.log('user', data);

      },
      onError: (e) => {

      }
    });

    // this.exampleLibDoa.get({
    //   onSuccess: (data) => {
    //     console.log('uses ', data);
    //   }, onError: (e) => {
    //     console.log(e);
    //   }
    // });
    //     onSuccess: (re) => {
    //       console.log(re);
    //     },
    //     onError: (error) => {
    //       console.log(error);
    //     }
    //   })
    // ;

  }
}
