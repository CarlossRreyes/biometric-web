import { Injectable , inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment.prod';
import { IntHorasTrabajadas } from '../horas-trabajadas/interfaces/horas_trabajadas.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HorasTrabajadasService {

  api = environment.apiUrl;
  http = inject(HttpClient);

  constructor() { }


  consultarHorasTrabajadas(usuario_id: number, fecha_inicio: string, fecha_fin: string): Observable<IntHorasTrabajadas[]>{
    const url = `${this.api}/horasTrabajadas/${usuario_id}/${fecha_inicio}/${fecha_fin}`;
    return this.http.get<IntHorasTrabajadas[]>(url);    
  }


}
