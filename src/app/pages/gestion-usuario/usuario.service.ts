import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment.prod';

import { InterfaceUsuario, UserPersonEdSav } from '@pages/gestion-usuario/interfaces/user-interface';
import { IntRol } from '@pages/gestion-usuario/interfaces/rol-interface';
import { User } from '@app/auth/interfaces/auth-interface';
import { IntSexo } from './interfaces/sexo.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api = environment.apiUrl;
  http = inject(HttpClient);


  getUser() : Observable<InterfaceUsuario>{
    const url = `${this.api}/user`;
    return this.http.get<InterfaceUsuario>(url);
  }

  saveUser(data: { usuario: UserPersonEdSav, persona: UserPersonEdSav }) : Observable<{ status : boolean, message : string, data : User }>{
    const url = `${this.api}/createUser`;
    return this.http.post<{status : boolean, message : string, data : User}>(url,data);
  }

  updateUser(data: { usuario: UserPersonEdSav, persona: UserPersonEdSav }) : Observable<InterfaceUsuario>{
    const url = `${this.api}/updateDataUser`;
    return this.http.post<InterfaceUsuario>(url,data);
  }

  deleteUser(id:number) : Observable<{status : boolean, message : string}>{
    const url = `${this.api}/deleteUser/${id}`;
    return this.http.get<{status : boolean, message : string}>(url);
  }

  getTiposRoles() :Observable<IntRol>{
    const url = `${this.api}/listarRol`;
    return this.http.get<IntRol>(url);
  }

  getSexo() :Observable<IntSexo>{
    const url = `${this.api}/sexo`;
    return this.http.get<IntSexo>(url);
  }
}
