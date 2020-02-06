import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ExampleLibDoa} from './ExampleLibDoa';


describe('AppComponent', () => {
  const doa = new ExampleLibDoa();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'AsORM'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('AsORM');
  });
  it('should  return value match condition', async () => {
  });
});
