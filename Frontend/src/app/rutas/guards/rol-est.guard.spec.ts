import { TestBed } from '@angular/core/testing';

import { RolEstGuard } from './rol-est.guard';

describe('RolEstGuard', () => {
  let guard: RolEstGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolEstGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
