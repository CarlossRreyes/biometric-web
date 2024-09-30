

//
export interface IntHorasExtras {
  labels: string[];
  data: string[];
  table: Table[];
  series: Series[];
}

export interface Series {
  name: string;
  points: Point[];
}

export interface Point {
  name: string;
  y: string;
}

export interface Table {
  departamento_id: number;
  departamento_nombre: string;
  total_horas_trabajadas: string;
  total_horas_extras: string;
}