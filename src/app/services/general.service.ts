import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IntAuth } from '@app/auth/interfaces/auth-interface';
import { AuthService } from '@app/auth/services/auth.service';
import { ICountList } from '@app/pages/dashboard/interfaces/dashboard.interfaces';
import { InterfaceUsuario, UserPersonEdSav } from '@app/pages/gestion-usuario/interfaces/user-interface';
import { environment } from '@env/environment.prod';
import { Observable, tap } from 'rxjs';
import decode from 'jwt-decode'



@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  api = environment.apiUrl;

  private horizontalPosition: MatSnackBarHorizontalPosition = 'end'; //'start' | 'center' | 'end' | 'left' | 'right'
  private verticalPosition: MatSnackBarVerticalPosition = 'top'; //'bottom'

  snackbar = inject(MatSnackBar);
  http = inject(HttpClient);
  auth = inject(AuthService);
 
  alert( message:string, icono:string, panelClass : string){
    return this.snackbar.open( message, icono, {
        duration:( 2 * 1000 ),
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        panelClass: [ panelClass ,'text-center'] //green-  -- red --  warning 
    });
  }


  titlecase(name:string): string {
    return  name.split(" ").map((l: string) => l[0].toUpperCase() + l.substring(1)).join(" ");
  }

  updatePerfil(data: { usuario: UserPersonEdSav, persona: UserPersonEdSav }) : Observable<IntAuth>{
    const url = `${this.api}/updatePerfilUser`;
    return this.http.post<IntAuth>(url,data).pipe(
      tap((data) => {
        this.auth.setLocalStorage('token',data.token);
        this.auth.decodificar = decode(data.token);
        this.auth.sendObjePayload(this.auth.decodificar);
      })
    );
  }

  getCountList() : Observable<ICountList>{
    const url = `${this.api}/count/list`;
    return this.http.get<ICountList>(url);
  }


  //DASHBOARD
  cargartendenciaAsistenciaGlobales(): Observable<any>{
    const url = `${this.api}/tendenciaAsistenciaGlobales`;
    return this.http.get<any>(url);
  }

  mostrarEmpresa() : Observable<any>{
    const url = `${this.api}/empresa`;
    return this.http.get<any>(url);
  }



}
