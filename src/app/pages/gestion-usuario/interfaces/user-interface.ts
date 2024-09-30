export interface InterfaceUsuario {
  status: boolean;
  message: string;
  data: Usuario[];
}

export interface Usuario {
  id?: number;
  persona_id?: number;
  rol_id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  imagen: string;
  estado?: string;
  created_at?: string;
  updated_at?: string;
  password? :string;
  persona?: Persona;
  rol?: Rol;
}

export interface Rol {
  id?: number;
  cargo?: string;
  estado?: string;
}

export interface Persona {
  id?: number;
  cedula?: string;
  nombres?: string;
  apellidos?: string;
  num_celular?: string;
  direccion?: any;
  estado?: string;
}

//interface personalizada para editar y guardar por http
export interface UserPersonEdSav {
  user_id?: number;
  persona_id?: number;
  rol_id?: number;
  name?: string;
  email?: string;
  imagen?: string;
  password? :string;
  cedula?: string;
  nombres?: string;
  apellidos?: string;
  num_celular?: string;
  direccion?: string;
  sexo_id? : number;
}
