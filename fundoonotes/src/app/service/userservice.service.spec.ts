import { TestBed } from "@angular/core/testing";

import { UserserviceService } from "./userservice.service";

describe("UserserviceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: UserserviceService = TestBed.get(UserserviceService);
    expect(service).toBeTruthy();
  });
});

//import { Userservice } from './userservice';
//import { HttpClient } from '@angular/common/http';

// describe('Userservice', () => {
//   it('should create an instance', () => {
//     expect().toBeTruthy();
//   });
// });
