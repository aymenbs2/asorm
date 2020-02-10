import {Component} from '@angular/core';
import {ExampleLibDoa} from './ExampleLibDoa';
import {User} from './User';

const global = window;

@Component({
  selector: 'app-root',
  template: '<h1> AsORM</h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static instance: AppComponent;
  title = 'AsORM';
  exampleLibDoa;

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
    this.exampleLibDoa = new ExampleLibDoa();
  }

  async addOnEnter() {
    const user = new User();
    user.name = 'aymen upted npow';
    user.note = 'test';
    user.shapes = ['55555', '1412', 'hdhdhdh'];
    user._id = '1581323621402';
    const rest = await this.exampleLibDoa.updateWhere('_id', user._id, '');

    //const result = await this.exampleLibDoa.get();
  }
}
