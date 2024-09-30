/* export interface IDepartamento{
  status: boolean;
  message: string;
  data: Departamento[];
}

export interface Departamento{
    id?: number;
    nombre: string;    
    estado: string;
}


 */

export interface Geo{
  lat?: number;    
  log?: number;
}

//new interface departamento
//response de listar
export interface IDepartamento {
  status: boolean;
  message: string;
  data: Departamento[];
}

export interface Departamento {
  id?: number;
  nombre?: string;
  estado?: string;
  geolocalizacion_departamento?: GeolocalizacionDepartamento[];
}

export interface GeolocalizacionDepartamento {
  id?: number;
  departamento_id?: number;
  lat?: number;
  log?: number;
}



///
export interface crearUpdateDepartamento{
  departamento? : Departamento,
  geolocalizacion_departamento? : GeolocalizacionDepartamento[];
}




/*
{
    "departamento":
    {
        "nombre":"prueba departamento"
    }, 
    "geolocalizacion_departamento":[
        { "lat": 123456789, "log": 987654321 },
        { "lat": 986555555, "log": 656565656 }
    ]


}
*/
