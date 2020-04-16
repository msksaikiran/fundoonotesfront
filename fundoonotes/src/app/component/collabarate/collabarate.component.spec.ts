import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabarateComponent } from './collabarate.component';

describe('CollabarateComponent', () => {
  let component: CollabarateComponent;
  let fixture: ComponentFixture<CollabarateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollabarateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabarateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
