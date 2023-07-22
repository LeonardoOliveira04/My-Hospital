import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MudarPasswordPage } from './mudar-password.page';

describe('MudarPasswordPage', () => {
  let component: MudarPasswordPage;
  let fixture: ComponentFixture<MudarPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MudarPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
