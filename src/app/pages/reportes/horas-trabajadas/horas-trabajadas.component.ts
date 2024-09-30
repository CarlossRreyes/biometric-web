import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '@app/pages/gestion-usuario/interfaces/urlActivatedRoute.interface';
import { HorasTrabajadasService } from '../services/horas-trabajadas.service';
import { UsuarioService } from '@app/pages/gestion-usuario/usuario.service';

import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-horas-trabajadas',
  templateUrl: './horas-trabajadas.component.html',
  styleUrls: ['./horas-trabajadas.component.scss']
})
export class HorasTrabajadasComponent implements OnInit {

  formHT! : FormGroup;
  listaUrl: IntUrlActivate[] = [];

  listaUsuarios: any[] = [];

  listHorasTrabajadas: any[] = [];

  dataSourceHorasTrabajadasResponse!: MatTableDataSource<any>;

  columnsToDisplayWithExpandUsersResponse: string[] = ['id','fecha','horas_extras','horas_trabajadas','total_horas_trabajadas'];

  constructor(
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private horasTra_service: HorasTrabajadasService,
    private user_service: UsuarioService
  ) { }

  //3 parametros = use_id, fecha_ini, fecha_fin

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;

    this.intForm();
    this.getUserLista();
  }


  intForm(){
    this.formHT = this.fb.group({
      usuario_id: ['', [Validators.required]],
      fecha_inicio : ['',  [Validators.required]],
      fecha_fin : ['',  [Validators.required]],
      fecha : [''],
      hora : [''],
    });
  }


  fieldsValidate(campo: string) {
    return this.formHT.get(campo)?.invalid && this.formHT.get(campo)?.touched;
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

    const form = this.formHT.value;
    let usuario_id = parseInt(form.usuario_id);
    let fecha_inicio = form.fecha_inicio;
    let fecha_fin = form.fecha_fin;


    this.horasTra_service.consultarHorasTrabajadas(usuario_id, fecha_inicio, fecha_fin).subscribe({
      next: (resp) => {
        if(resp.length > 0){
          console.log(resp);
          this.listData(resp);
          const fecha = new Date();

          this.formHT.get('fecha')?.setValue(fecha);

        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  listData(horasTrabajadas: any){
    this.listHorasTrabajadas = [];
    this.listHorasTrabajadas = horasTrabajadas;
    this.dataSourceHorasTrabajadasResponse = new MatTableDataSource(this.listHorasTrabajadas);

/*     apellidos: "suarez"
​​
    fecha: "2023-06-28"
    ​​
    horas_extras: "00:00:00"
    ​​
    horas_trabajadas: "04:00:13"
    ​​
    nombres: "prueba"
    ​​
    total_horas_trabajadas: "04:00:13"
    ​​
    user_id: 19 */


  }





}
