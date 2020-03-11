import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ExampleLibDao} from './ExampleLibDao';
import {User} from './User';
import {Callback} from './callback';
import {AsormConfig, AttachmentTypes} from 'asorm';
import {compileSourceFiles} from 'ng-packagr';
import {error} from 'ng-packagr/lib/util/log';
import {Md5Helper} from '../../projects/asorm/src/lib/asorm/helpers/md5.helper';
import {PatientDao} from './PatientDao';
import {PatientEntity} from './Patient';

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
    this.config = new AsormConfig({url: 'http://localhost:5984/', dbName: 'astorm'});
    this.config.synchronize().on('change', data => {
      console.log('changes', data);
    });
    AppComponent.instance = this;
    this.createDoa();
    document.addEventListener('click', () => {
      console.log('clikc');
      this.addOnEnter();
    });
  }

  static getInstance() {
    return this.instance;
  }

  createDoa() {
    this.exampleLibDoa = new ExampleLibDao();
    this.patientDoa = new PatientDao();
  }

  async addOnEnter() {
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
