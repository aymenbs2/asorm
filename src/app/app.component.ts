import { Component } from '@angular/core';
import { ExampleLibDoa } from './ExampleLibDoa';
import { User } from './User';

const global = window;

@Component({
  selector: 'app-root',
  template: '<h1> AsORM</h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AsORM';
  exampleLibDoa;

  constructor() {
    this.exampleLibDoa = new ExampleLibDoa();
    document.addEventListener('click', () => {
      console.log('clikc');
      this.addOnEnter();
    });

  }

  async addOnEnter() {
    // const user = new User();
    // user.name = 'mejdi';
    // user._id = (new Date().getTime()) + '';
    // user.note = 'test';
    // user.shapes = ['55555', '1412', 'hdhdhdh'];
    // await this.exampleLibDoa.put(user);
    console.log(await this.exampleLibDoa.where("name", "like", "me").apply());
  }
}
