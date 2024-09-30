import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '../gestion-usuario/interfaces/urlActivatedRoute.interface';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserSinDeparService } from './services/user-sin-depar.service';
import { DepartamentoserviceService } from '../gestion-departamento/departamentoservice.service';
import { GeneralService } from '@app/services/general.service';

@Component({
  selector: 'app-asignacion-user-departamento',
  templateUrl: './asignacion-user-departamento.component.html',
  styleUrls: ['./asignacion-user-departamento.component.scss']
})
export class AsignacionUserDepartamentoComponent implements OnInit {
  listaUrl: IntUrlActivate[] = [];
  listaUserSinDepartamento: any[] = [];
  listaDepartamento : any[] = [];

  newlistaUser  : any[] = [];
  newDepartamento : any [] = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private _usd : UserSinDeparService,
    private _gs : GeneralService,

  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;
    this.listarUserSinDepartamento();
    this.listarDepartamento();
  }

  listarUserSinDepartamento(){
    this._usd.getUserSinDepar().subscribe({
      next : (resp) => {
        if (resp.status) {
          this.listaUserSinDepartamento = resp.data;
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  listarDepartamento(){
    this._usd.getDeparActive().subscribe({
      next : (resp) => {
        if (resp.status) {
          this.listaDepartamento = resp.data;
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  dropUser(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dropDepartamento(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dropOnListDepart(event: CdkDragDrop<any[]>){
    //obtenemos el elemento
    const element = (event.previousContainer.data as Array<any>)[event.previousIndex];

    //Comprobamos que no exista este elemento en ele array
    const isExist = (event.container.data as Array<any>).includes(element);

    if (!isExist) {
      event.container.data.splice(0, 1);
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
    } 
  }

  asignacionUsersDepartamento(){
    if (this.newlistaUser.length == 0) {
      this._gs.alert('Asigne más que sea un usuario', '⚠️', 'warning');
      return;
    }

    if (this.newDepartamento.length == 0) {
      this._gs.alert('Asigne un departamento', '⚠️', 'warning');
      return;
    }

    const dataRequest = this.newlistaUser.map( (f) => {
        const data = {
          usuario_id : f.id,
          departamento_id : this.newDepartamento[0].id
        }
        return data
    });

    let json = {
      lista : dataRequest
    }

    this._usd.asigarUsuariosDepartamento(json).subscribe({
      next : (resp) => {
        if (resp.status) {
          this._gs.alert(resp.message, '🚀', 'green');
          this.newlistaUser = [];
          this.newDepartamento = [];
          this.listarUserSinDepartamento();
        }else {
          this._gs.alert(resp.message, '📛', 'red');

        }
      },
      error : (err) => {
        console.log(err);
      }
    });
  
  }



}
