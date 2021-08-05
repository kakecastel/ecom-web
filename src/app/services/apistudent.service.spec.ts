import { TestBed } from '@angular/core/testing';

import { ApistudentService } from './apistudent.service';

describe('ApistudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApistudentService = TestBed.get(ApistudentService);
    expect(service).toBeTruthy();
  });
});
