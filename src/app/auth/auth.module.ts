import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from '@auth/login/login.component';
import { MaterialsModule } from '@materials/materials.module';
import { PagesModule } from '@pages/pages.module';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports : [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialsModule,
    PagesModule //aqui utilizo las directivas
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AuthModule { }
