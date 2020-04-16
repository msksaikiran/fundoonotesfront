import { TestBed } from '@angular/core/testing';

import { CollabarateService } from './collabarate.service';

describe('CollabarateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollabarateService = TestBed.get(CollabarateService);
    expect(service).toBeTruthy();
  });
});
