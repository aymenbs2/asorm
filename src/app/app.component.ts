import {Component, OnInit} from '@angular/core';
import {ExampleLibDao} from '../app/ExampleLibDao';
import {User} from './User';
import {AttachmentTypes} from '../../projects/asorm/src/lib/asorm/attachment/types';
import {saveAs} from 'file-saver';
import {config} from 'rxjs';
import {AsormConfig} from 'asorm';
import {PatientDao} from "./PatientDao";
import {PatientEntity} from "./Patient";

const global = window;

@Component({
  selector: 'app-root',
  template: '<h1>' +
    '<img *ngIf="isLoaded" [src]="imgSc">' +
    ' AsORM</h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static instance: AppComponent;
  title = 'AsORM';
  exampleLibDoa;
  imgSc: any;
  isLoaded;
  cn: any;
  patientDao;

  constructor() {
    this.cn = new AsormConfig({
      url: 'http://localhost;5984/',
      dbName: 'firsttest',
      username: 'admin',
      password: 'password'
    });
    AppComponent.instance = this;
    this.isLoaded = false;

  }

  ngOnInit(): void {
    try {
      this.cn.synchronize().on('change', (data) => {

      }).on('paused', function (info) {
        console.log('en paused', info)
        // replication was paused, usually because of a lost connection
      }).on('active', function (info) {
        // replication was resumed
      }).on('error', function (err) {
        console.log('en error')

        // totally unhandled error (shouldn't happen)
      });
    } catch (e) {
      console.log('cathc', e)
    }
    this.createDoa();
    document.addEventListener('click', () => {
      console.log('clikc');
      this.addOnEnter();
    })
  }


  createDoa() {
    this.exampleLibDoa = new ExampleLibDao();
    this.patientDao = new PatientDao();
  }

  async addOnEnter() {
    const user = new User();
    const patient = new PatientEntity();
    user.name = 'first';
    user._id = (new Date().getTime()) + '';
    user.note = 'aymen';
    user.shapes = ['55555', '1412', 'hdhdhdh'];
    user.name = 'first';
    patient._id = (new Date().getTime()) + '';
    patient.name = 'first';
    //  this.patientDao.put(patient)
    const res = await this.exampleLibDoa.where("note", 'aymen',"like").update({name: "fisrt_updated"});
    console.log('update res', res);
    // this.exampleLibDoa.get({
    //   onSuccess: (data) => {
    //     console.log(data);
    //   },
    //   onError: (e) => {
    //     console.log(e)
    //   }
    // })
    // ;
  }


}
