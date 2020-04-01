import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelNotesdetailsComponent } from './label-notesdetails.component';

describe('LabelNotesdetailsComponent', () => {
  let component: LabelNotesdetailsComponent;
  let fixture: ComponentFixture<LabelNotesdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelNotesdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelNotesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
