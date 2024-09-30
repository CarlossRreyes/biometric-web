import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleDeparService {

  api = environment.apiUrl;
  http = inject(HttpClient);


  consultaEmpleadosXDepartamento(departamneto_id:number) : Observable<any>{
    const url = `${this.api}/listUsuariosXdepartamentos/${departamneto_id}`;
    return this.http.get<any>(url);
  }
}
