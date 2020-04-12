import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpinComponent } from './unpin.component';

describe('UnpinComponent', () => {
  let component: UnpinComponent;
  let fixture: ComponentFixture<UnpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
