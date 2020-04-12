import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteupdateComponent } from './noteupdate.component';

describe('NoteupdateComponent', () => {
  let component: NoteupdateComponent;
  let fixture: ComponentFixture<NoteupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
