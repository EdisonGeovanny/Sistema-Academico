import { TestBed } from '@angular/core/testing';

import { RolProfGuard } from './rol-prof.guard';

describe('RolProfGuard', () => {
  let guard: RolProfGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolProfGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
