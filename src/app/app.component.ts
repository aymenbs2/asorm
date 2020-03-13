import {Component} from '@angular/core';
import {ExampleLibDao} from '../app/ExampleLibDao';
import {User} from './User';
import {AttachmentTypes} from '../../projects/asorm/src/lib/asorm/attachment/types';
import {saveAs} from 'file-saver';
import {config} from 'rxjs';
import {AsormConfig} from 'asorm';

const global = window;

@Component({
  selector: 'app-root',
  template: '<h1>' +
    '<img *ngIf="isLoaded" [src]="imgSc">' +
    ' AsORM</h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static instance: AppComponent;
  title = 'AsORM';
  exampleLibDoa;
  imgSc: any;
  isLoaded;

  constructor() {

    const cn = new AsormConfig({url: 'http://couchdb.sfax.cover3d.com/', dbName: 'cover3ttest', username: 'admin', password: 'password'});
    cn.synchronize().on('change', (data) => {
      console.log(data);
      console.log(data.direction);
    });
    this.createDoa();
    document.addEventListener('click', () => {
      console.log('clikc');
      this.addOnEnter();
    });
    AppComponent.instance = this;
    this.isLoaded = false;
  }


  createDoa() {
    this.exampleLibDoa = new ExampleLibDao();
  }

  async addOnEnter() {
    let reader: FileReader;
    const user = new User();
    user.name = 'orWhere1';
    user._id = (new Date().getTime()) + '';
    user.note = 'orWhere1';
    user.shapes = ['55555', '1412', 'hdhdhdh'];
    // this.exampleLibDoa.put(user);
    const result = await this.exampleLibDoa.where('name', 'orWhere1').where('note', 'orWhere1').orWhere('name', 'orWhere2').apply();
    console.log(result);
  }

  dataURLtoFile(dataurl, filename) {

    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

}
