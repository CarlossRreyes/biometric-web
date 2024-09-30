import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Departamento, IDepartamento, crearUpdateDepartamento } from './interfaces/departamento.interface';
@Injectable({
  providedIn: 'root'
})
export class DepartamentoserviceService {

  api = environment.apiUrl;
  http = inject(HttpClient);

  public useLocation?: [number, number];

  get isLocation(): boolean {//getter de localización
    return !!this.useLocation;//El operador !! se utiliza para convertir un valor a su equivalente booleano.
  }

  public hasLocation: boolean = false;
  public locationSubject: BehaviorSubject<GeolocationPosition | null> = new BehaviorSubject<GeolocationPosition | null>(null);
  //public dataLocation$ = this.locationSubject.asObservable();

 /*  private get getUbicacionValue(): GeolocationPosition | null{
    return this.locationSubject.getValue();
  } */

  constructor() { 

  }

  getAllDepartaments() : Observable<IDepartamento>{
    const url = `${this.api}/departament/list`;
    return this.http.get<IDepartamento>(url);
  }

  createDepartament(data:crearUpdateDepartamento) : Observable<IDepartamento>{
    const url = `${this.api}/departament/save`;
    return this.http.post<IDepartamento>(url,data);
  }

  updateDepartament(data:crearUpdateDepartamento) : Observable<IDepartamento>{
    const url = `${this.api}/departament/update`;
    return this.http.post<IDepartamento>(url,data);
  }

  deleteDepartament(id:number) : Observable<IDepartamento>{
    const url = `${this.api}/departament/delete/${id}`;
    return this.http.get<IDepartamento>(url);
  }

  //metodo para obtener la coordenadas actuales(tipo promise)
  getLocationPromise(){
    return new Promise( ( resolve, reject ) => {
      navigator.geolocation.getCurrentPosition( ({coords}) => {
        this.useLocation = [coords.latitude, coords.longitude];
        resolve(this.useLocation);
      }, (err) => { console.log('Error acitve el localizador'); } );
    });
  }


  //otro manera de tipo observable
  /* getLocationObservableNormal(): Observable<GeolocationPosition> {
    return new Observable<GeolocationPosition>((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            observer.next(position);
            observer.complete();
          },
          (error: GeolocationPositionError) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  } */

  getLocation(): Observable<GeolocationPosition | null> {
    if (this.hasLocation) {//false
      return this.locationSubject.asObservable();
    } else {//true
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            this.locationSubject.next(position);
            this.locationSubject.complete();
            this.hasLocation = true;
          },
          (error: GeolocationPositionError) => {
            this.locationSubject.error(error);
          }
        );
      } else {
        this.locationSubject.error('Geolocation is not supported by this browser.');
      }
      return this.locationSubject.asObservable();
    }
  }



  /* getLocationObservableRxjs(): Observable<GeolocationPosition | null> {
    if (this.hasLocation) {
      return this.dataLocation$;
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            this.locationSubject.next(position);
            this.locationSubject.complete();
            this.hasLocation = true;
          },
          (error: GeolocationPositionError) => {
            this.locationSubject.error(error);
          }
        );
      } else {
        this.locationSubject.error('Geolocation is not supported by this browser.');
      }
      return this.dataLocation$;
    }
  }

  hasLocationAccess(): boolean {
    return this.hasLocation;
  } */



}
