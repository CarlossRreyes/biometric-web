import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento, IEvento } from './interfaces/evento.interface';
@Injectable({
  providedIn: 'root'
})
export class EventoserveService {
  api = environment.apiUrl;
  http = inject(HttpClient);

  getEvento() : Observable<IEvento>{
    const url = `${this.api}/event/list`;
    return this.http.get<IEvento>(url);
  }

  saveEvento(data: { evento: Evento }) : Observable<IEvento>{
    const url = `${this.api}/event/save`;
    return this.http.post<IEvento>(url,data);
  }

  updateEvento(data: { evento: Evento }) : Observable<IEvento>{
    const url = `${this.api}/event/update`;
    return this.http.post<IEvento>(url,data);
  }

  deleteEvento(id:number) : Observable<IEvento>{
    const url = `${this.api}/event/delete/${id}`;
    return this.http.get<IEvento>(url);
  }
}
