import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabarateVerifyComponent } from './collabarate-verify.component';

describe('CollabarateVerifyComponent', () => {
  let component: CollabarateVerifyComponent;
  let fixture: ComponentFixture<CollabarateVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollabarateVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabarateVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
