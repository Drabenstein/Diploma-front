import { TestBed } from '@angular/core/testing';

import { ProgramCommitteeGuard } from './program-committee.guard';

describe('ProgramCommitteeGuard', () => {
  let guard: ProgramCommitteeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProgramCommitteeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
