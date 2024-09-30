import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from '@pages/pages.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { GestionUsuarioComponent } from '@pages/gestion-usuario/gestion-usuario.component';

import { AuthGuard } from '@auth/guards/auth.guard';
import { GestionEventoComponent } from './gestion-evento/gestion-evento.component';
import { GestionDepartamentoComponent } from './gestion-departamento/gestion-departamento.component';
import { AsignacionUserDepartamentoComponent } from './asignacion-user-departamento/asignacion-user-departamento.component';
import { EmpleadosDepartamentoComponent } from './reportes/empleados-departamento/empleados-departamento.component';
import { AsistenciasDepartamentoComponent } from './reportes/asistencias-departamento/asistencias-departamento.component';
import { HorasTrabajadasComponent } from './reportes/horas-trabajadas/horas-trabajadas.component';
import { PuntualesAtrasadosComponent } from './reportes/puntuales-atrasados/puntuales-atrasados.component';

const routes: Routes = [
  { path : '' , redirectTo : 'inicio/dashboard', pathMatch : 'full'},
  { 
    path : '', 
    component : PagesComponent,//home pagina principal
    canActivate : [AuthGuard],
    children : [
      { 
        path : 'inicio/dashboard', 
        component : DashboardComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'gestión-usuario/nuevo-usuario', 
        component : GestionUsuarioComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'registro/evento', 
        component : GestionEventoComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'registro/departamento', 
        component : GestionDepartamentoComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'registro/asignacion', 
        component : AsignacionUserDepartamentoComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'reporte/empleados-departamento', 
        component : EmpleadosDepartamentoComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'reporte/asistencia-departamento', 
        component : AsistenciasDepartamentoComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'reporte/hora-trabajadas', 
        component : HorasTrabajadasComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'reporte/puntuales', 
        component : PuntualesAtrasadosComponent, 
        canActivate : [AuthGuard]  
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
