import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@app/app-routing.module';
//componentes
import { AppComponent } from '@app/app.component';
import { NoPageFoundComponent } from '@app/components/no-page-found/no-page-found.component';

//modulos
import { AuthModule } from '@auth/auth.module';
import { PagesModule } from '@pages/pages.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from '@app/interceptor/auth-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    NoPageFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    PagesModule,ReactiveFormsModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true },//inyectamos el interceptor 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService //permitir decodificar y decodificar token 
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
