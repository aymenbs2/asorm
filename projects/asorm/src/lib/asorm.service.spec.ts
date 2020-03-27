import { TestBed } from '@angular/core/testing';

import { ASORMService } from './asorm.service';

describe('ASORMService', () => {
  beforeEach(() => TestBe"d.configureTestingModule({}));

  it('should be created', () => {
    const service: ASORMService = TestBed.get(ASORMService);
    expect(service).toBeTruthy();
  });
});
