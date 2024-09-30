import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from '@pages/pages-routing.module';

import { PagesComponent } from '@pages/pages.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { GestionUsuarioComponent } from '@pages/gestion-usuario/gestion-usuario.component';
import { CrearEditarUsuarioComponent } from '@pages/gestion-usuario/crear-editar-usuario/crear-editar-usuario.component';


import { SharedModule } from '@shared/shared.module';
import { MaterialsModule } from '@materials/materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DialodDeleteModule } from '@app/dialod-delete/dialod-delete.module';

import { CedulaDirective } from '@directives/cedula.directive';
import { NumericOnlyDirectiveDirective } from '@directives/numeric-only-directive.directive';
import { AlphaNumericDirective } from '@directives/alpha-numeric.directive';
import { EmailValidationDirective } from '@directives/email-validation.directive';
import { LettersDirective } from '@directives/letters.directive';
import { NumerosEcuadorPhoneDirective } from '@directives/numeros-ecuador-phone.directive';
import { GestionEventoComponent } from './gestion-evento/gestion-evento.component';
import { CrearDepartamentoComponent } from './gestion-departamento/crear-departamento/crear-departamento.component';
import { CrearEventoComponent } from './gestion-evento/crear-evento/crear-evento.component';
import { GestionDepartamentoComponent } from './gestion-departamento/gestion-departamento.component';
import { AsignacionUserDepartamentoComponent } from './asignacion-user-departamento/asignacion-user-departamento.component';
import { EmpleadosDepartamentoComponent } from './reportes/empleados-departamento/empleados-departamento.component';
import { AsistenciasDepartamentoComponent } from './reportes/asistencias-departamento/asistencias-departamento.component';
import { HorasTrabajadasComponent } from './reportes/horas-trabajadas/horas-trabajadas.component';
import { PuntualesAtrasadosComponent } from './reportes/puntuales-atrasados/puntuales-atrasados.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    GestionUsuarioComponent,
    CrearEditarUsuarioComponent,
    GestionEventoComponent,
    GestionDepartamentoComponent,
    CrearDepartamentoComponent,
    CrearEventoComponent,
    NumericOnlyDirectiveDirective,
    CedulaDirective,
    AlphaNumericDirective,
    EmailValidationDirective,
    LettersDirective,
    NumerosEcuadorPhoneDirective,
    AsignacionUserDepartamentoComponent,
    EmpleadosDepartamentoComponent,
    AsistenciasDepartamentoComponent,
    HorasTrabajadasComponent,
    PuntualesAtrasadosComponent,
    
  ],
  exports : [
    CommonModule,
    EmailValidationDirective,
    MaterialsModule
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MaterialsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    DialodDeleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
