import { TestBed } from '@angular/core/testing';

import { CadyService } from './cady.service';

describe('CadyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadyService = TestBed.get(CadyService);
    expect(service).toBeTruthy();
  });
});
