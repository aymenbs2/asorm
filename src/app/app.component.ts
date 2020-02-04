import {Component} from '@angular/core';
import {ExampleLibDoa} from './ExampleLibDoa';
import {User} from './User';

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
    const user = new User();
    user.name = 'khalil';
    user._id = (new Date().getTime()) + '';
    user.note = 'test';
    await this.exampleLibDoa.put(user);
    console.log(await this.exampleLibDoa.get());
  }
}
