import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { NavComponent } from '@shared/nav/nav.component';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { PerfilComponent } from '@shared/perfil/perfil.component';
import { FooterComponent } from '@shared/footer/footer.component';

import { MaterialsModule } from '@materials/materials.module';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EmpresaComponent } from './empresa/empresa.component';


@NgModule({
  declarations: [
    SidebarComponent,
    NavComponent,
    BreadcrumbComponent,
    PerfilComponent,
    FooterComponent,
    EmpresaComponent
  ],
  exports : [
    SidebarComponent,
    NavComponent,
    BreadcrumbComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule,
    NgxDropzoneModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
