import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '@app/pages/gestion-usuario/interfaces/urlActivatedRoute.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PuntualesAtrasadosService } from '../services/puntuales-atrasados.service';
import { UsuarioService } from '@app/pages/gestion-usuario/usuario.service';

import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-puntuales-atrasados',
  templateUrl: './puntuales-atrasados.component.html',
  styleUrls: ['./puntuales-atrasados.component.scss']
})
export class PuntualesAtrasadosComponent implements OnInit {

  listaUrl: IntUrlActivate[] = [];


  listAtrasadoPuntuales: any[] = [
/*     {
      type: 'S',
      name: 'Atrasado'      
    }, */
    {
      type: 'N',
      name: 'Puntuales',
    }
  ];
  

  listaPuntualesAtrasadosXasistencia: any[] = [];

  

  dataSourceAtrasadosPuntualesxAsistenciaResponse!: MatTableDataSource<any>;

  columnsToDisplayWithExpandUsersResponse: string[] = ['id', 'id_usuario', 'usuario', 'tipo', 'tipoAsistencia', 'fecha', 'hora'];

  formAP! : FormGroup;

  constructor(
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private user_service: UsuarioService,
    private pa_service : PuntualesAtrasadosService
  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;
    this.initForm();
  }

  fieldsValidate(campo: string) {
    return this.formAP.get(campo)?.invalid && this.formAP.get(campo)?.touched;
  }

  initForm(){
    this.formAP = this.fb.group({
      tipo_atrasado_asistencia: ['', [Validators.required]],
      fecha_inicio : ['',  [Validators.required]],
      fecha_fin : ['',  [Validators.required]],      
      fecha : [''],
      hora : [''],
    });
  }

  consultar(){
    const form = this.formAP.value;
    let type = form.tipo_atrasado_asistencia;
    let f_inicio = form.fecha_inicio;
    let f_fin = form.fecha_fin;

    console.log(type)

    this.pa_service.consultaPuntualesAtrasadosXasistencia(f_inicio, f_fin ).subscribe({
      next: (resp) => {
        if(resp.status){
          console.log(resp.data);
          this.listData(resp.data);
          const fecha = new Date();

          this.formAP.get('fecha')?.setValue(fecha);
          
          
        }
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  listData(puntualesAtrasadosXAsistencia: any){
    this.listaPuntualesAtrasadosXasistencia = [];
    this.listaPuntualesAtrasadosXasistencia = puntualesAtrasadosXAsistencia;
    this.dataSourceAtrasadosPuntualesxAsistenciaResponse = new MatTableDataSource(this.listaPuntualesAtrasadosXasistencia);
  }



}
