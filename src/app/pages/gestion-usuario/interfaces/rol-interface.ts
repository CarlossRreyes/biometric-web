export interface IntRol {
  status: boolean;
  message: string;
  data: Rol[];
}

export interface Rol {
  id: number;
  cargo: string;
  estado: string;
}