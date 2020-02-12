import {Component} from '@angular/core';
import {ExampleLibDao} from './ExampleLibDao';
import {User} from './User';
import {Callback} from './callback';

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
    this.exampleLibDoa = new ExampleLibDao();
  }

  async addOnEnter() {
    // const user = new User();
    // user.name = 'aymen upted npow';
    // user.note = 'test';
    // user.shapes = ['55555', '1412', 'hdhdhdh'];
    // user._id = '1581323621402';
     await this.exampleLibDoa.where('name', 'ay', 'like').deleteWhere('name', 'ay', 'like', {
      onSuccess: (data) => {
        console.log('suu', data);
      },
      onError: (e) => {
        console.log(e);
      }
    });
    // this.exampleLibDoa.get({
    //   onPreExecute: () => {
    //     console.log('on pre execute');
    //   },
    //   onSuccess: (result) => {
    //     console.log(result);
    //   },
    //   onError: (e) => {
    //     console.log(e);
    //   },
    //   onPostExecute: () => {
    //     console.log('ddd');
    //   }
    // });
  }
}
