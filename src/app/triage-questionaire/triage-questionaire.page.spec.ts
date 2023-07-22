import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriageQuestionairePage } from './triage-questionaire.page';

describe('TriageQuestionairePage', () => {
  let component: TriageQuestionairePage;
  let fixture: ComponentFixture<TriageQuestionairePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TriageQuestionairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
