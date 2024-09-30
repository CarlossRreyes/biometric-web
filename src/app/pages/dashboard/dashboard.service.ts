
import { environment } from '@env/environment.prod';
import { HttpClient } from '@angular/common/http'; 
import { Observable, tap } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { IntRegrecion } from './interfaces/dashboard.interfaces';
import { IntHorasExtras } from './interfaces/horas-extras.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  api = environment.apiUrl;
  http = inject(HttpClient);


  cargarTipoAsistencia() : Observable<any>{
    let url = this.api + '/getTipoAsistencia';
    return this.http.get<any>(url);
  }

  regresionLinealAsistencia(temporalidad_id:number,tipo_asistencia_id:number,fechaInicio:string,fechaFin:string) : Observable<IntRegrecion>{
    let url = `${this.api}/regresionLinealAsistencias/${temporalidad_id}/${tipo_asistencia_id}/${fechaInicio}/${fechaFin}`;
    return this.http.get<IntRegrecion>(url);
  }

  horasExtras(fechaInicio:string,fechaFin:string) : Observable<IntHorasExtras>{
    let url = `${this.api}/horasExtrasAgrupadosXDepartamentoKpi/${fechaInicio}/${fechaFin}`;
    return this.http.get<IntHorasExtras>(url);
  }


  
}
