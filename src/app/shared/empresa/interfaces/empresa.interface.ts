export interface InterfaceEmpresa {
    status: boolean;
    message: string;
    data: Empresa[];

  }

  export interface Empresa {
    id?: number;
    nombre_empresa?: string;
    acerca?: string;
    imagen?: string;
    celular?:number;
    redes_sociales_id?: number;
    
    lat:string;
    log:string;

  }

  export interface RedesSociales{
    id?: number;
    name?:string;
    url?:string;
  }