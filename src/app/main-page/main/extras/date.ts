import { Horario } from './horario';

export interface Date {
  name: string;
  horario : Horario;
  planeacion_previa : string;
  completed : boolean;
  delete : boolean
}
