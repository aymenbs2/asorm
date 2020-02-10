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
    // const user = new User();
    // user.name = 'aymen';
    // user._id = (new Date().getTime()) + '';
    // user.note = 'test';
    // user.shapes = ['55555', '1412', 'hdhdhdh'];
    // await this.exampleLibDoa.put(user);
    // let result = await this.exampleLibDoa.where('name', 'aymen', 'like').apply();
    // for (let res of result.docs) {
    //   res.name = "update"
    //   let supp = await this.exampleLibDoa.update(res)
    //   console.log(supp, "supp is");
    // }
    const result = this.exampleLibDoa.syncWith('http://localhost:5984/user').on('change', changes => {
      console.log('changes', changes);
    });

  }
}
