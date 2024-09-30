import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PuntualesAtrasadosService {

  api = environment.apiUrl;
  http = inject(HttpClient);

  constructor() { }

  consultaPuntualesAtrasadosXasistencia(f_inicio: string, f_fin: string) : Observable<any>{
    const url = `${this.api}/puntualesAtrasadoAsistencia/${f_inicio}/${f_fin}`;
    return this.http.get<any[]>(url);
  }
}
