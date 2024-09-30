
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AsistDeparService {

  
  api = environment.apiUrl;
  http = inject(HttpClient);

  constructor() { }

  consultaAsistenciaXDepartamento(f_inicio: string, f_fin: string, usuario_id: number) : Observable<any>{
    const url = `${this.api}/asistenciaXdepartamento/${f_inicio}/${f_fin}/${usuario_id}`;
    return this.http.get<any[]>(url);
  }
}
