import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodasConsultasPage } from './todas-consultas.page';

describe('TodasConsultasPage', () => {
  let component: TodasConsultasPage;
  let fixture: ComponentFixture<TodasConsultasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodasConsultasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
