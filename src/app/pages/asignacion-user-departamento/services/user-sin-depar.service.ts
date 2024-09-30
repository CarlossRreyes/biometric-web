import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSinDeparService {

  api = environment.apiUrl;
  http = inject(HttpClient);


  getUserSinDepar() : Observable<any>{
    const url = `${this.api}/departament/listNotAssigned`;
    return this.http.get<any>(url);
  }

  getDeparActive() : Observable<any>{
    const url = `${this.api}/departament/activeList`;
    return this.http.get<any>(url);
  }

  asigarUsuariosDepartamento(data:any): Observable<any>{
    const url = `${this.api}/asignUserDepartament`;
    return this.http.post<any>(url,data);
  }


  
}
