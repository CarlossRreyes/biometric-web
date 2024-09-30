import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntualesAtrasadosComponent } from './puntuales-atrasados.component';

describe('PuntualesAtrasadosComponent', () => {
  let component: PuntualesAtrasadosComponent;
  let fixture: ComponentFixture<PuntualesAtrasadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntualesAtrasadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntualesAtrasadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
