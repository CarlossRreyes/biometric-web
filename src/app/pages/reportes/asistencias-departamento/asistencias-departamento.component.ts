import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '@app/pages/gestion-usuario/interfaces/urlActivatedRoute.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AsistDeparService } from '../services/asist-depar.service';
import { UsuarioService } from '@app/pages/gestion-usuario/usuario.service';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-asistencias-departamento',
  templateUrl: './asistencias-departamento.component.html',
  styleUrls: ['./asistencias-departamento.component.scss']
})
export class AsistenciasDepartamentoComponent implements OnInit {
  listaUrl: IntUrlActivate[] = [];

  listaUsuarios: any[] = [];

  asistenciaXdepartamento: any[] = [];

  name_type: any = '';

  dataSourceAsistenciaxDepartamentoResponse!: MatTableDataSource<any>;

  columnsToDisplayWithExpandUsersResponse: string[] = ['id','fecha','hora', 'tipo_asistencia', 'tipo_registro', 'asistencias_departamento'];

  formAD! : FormGroup;

  constructor(
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private user_service: UsuarioService,
    private asis_service : AsistDeparService

  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;
    this.initForm();
    this.getUserLista();


  }

  
  listData(ListasistenciaXdepartamento: any){
    this.asistenciaXdepartamento = [];
    this.asistenciaXdepartamento = ListasistenciaXdepartamento;
    for(let x of this.asistenciaXdepartamento){ x.tipo_asistencia.id == 1 ? this.name_type = "Departamento": this.name_type = "Nombre del evento";}
    this.dataSourceAsistenciaxDepartamentoResponse = new MatTableDataSource(this.asistenciaXdepartamento);
  }

  initForm(){
    this.formAD = this.fb.group({
      usuario_id: ['', [Validators.required]],
      fecha_inicio : ['',  [Validators.required]],
      fecha_fin : ['',  [Validators.required]],
      usuario: [''],
      fecha : [''],
      hora : [''],
      
    });
  }

  fieldsValidate(campo: string) {
    return this.formAD.get(campo)?.invalid && this.formAD.get(campo)?.touched;
  }

  getUserLista() {
    this.user_service.getUser().subscribe({
      next: (resp) => { 
        if (resp.data.length > 0) { this.listaUsuarios = resp.data}
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  consultar(){
    const form = this.formAD.value;
    let usuario_id = parseInt(form.usuario_id);
    let f_inicio = form.fecha_inicio;
    let f_fin = form.fecha_fin;

    
    this.asis_service.consultaAsistenciaXDepartamento(f_inicio, f_fin, usuario_id ).subscribe({
      next: (resp) => {
        if(resp.status){
          console.log(resp.data);
          this.listData(resp.data.asistencias);
          console.log(resp.data.cabecera.usuario)
          this.formAD.get('usuario')?.setValue(resp.data.cabecera.usuario);
          const fecha = new Date();

          this.formAD.get('fecha')?.setValue(fecha);

        }
      },
      error: (err) => {
        console.log(err);
      }
    });


  }





}
