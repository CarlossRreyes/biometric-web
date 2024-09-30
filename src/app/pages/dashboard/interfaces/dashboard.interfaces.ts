


export interface ICountList {
  data: DatosList[];
}

export interface DatosList {
  nombre: string;
  cantidad: number;
  icono: string;

}


//interface regrecion 
export interface IntRegrecion {
  status: boolean,
  data: Data;
  constantes: Constantes;
  promedios: Inicio;
  ecuacion: Ecuacion;
}

export interface Ecuacion {
  'f(x)': string;
  signo: string;
  margen: Margen;
}

export interface Margen {
  x: X;
  y: Y;
}

export interface Y {
  minimo: number;
}

export interface X {
  minimo: number;
  maximo: number;
}

export interface Constantes {
  a: number;
  b: number;
}

export interface Data {
  datos: number;
  fecha: string[];
  puntos: Puntos;
}

export interface Puntos {
  inicio: Inicio;
  fin: Inicio;
  proyeccion: Inicio;
}

export interface Inicio {
  x: number;
  y: number;
}