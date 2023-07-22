import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeslotPage } from './timeslot.page';

describe('TimeslotPage', () => {
  let component: TimeslotPage;
  let fixture: ComponentFixture<TimeslotPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TimeslotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
