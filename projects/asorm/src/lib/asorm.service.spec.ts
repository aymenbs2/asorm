import { TestBed } from '@angular/core/testing';

import { ASORMService } from './asorm.service';

describe('ASORMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ASORMService = TestBed.get(ASORMService);
    expect(service).toBeTruthy();
  });
});
