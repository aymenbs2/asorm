import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ASORMComponent } from './asorm.component';

describe('ASORMComponent', () => {
  let component: ASORMComponent;
  let fixture: ComponentFixture<ASORMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ASORMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ASORMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
