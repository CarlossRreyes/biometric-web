import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MatDialog } from '@angular/material/dialog';
import { delay } from 'rxjs';

import { CrearEditarUsuarioComponent } from '@pages/gestion-usuario/crear-editar-usuario/crear-editar-usuario.component';
import { DeleteModalComponent } from '@app/dialod-delete/delete-modal/delete-modal.component';

import { UsuarioService } from '@pages/gestion-usuario/usuario.service';
import { GeneralService } from '@app/services/general.service';

import { Usuario } from '@pages/gestion-usuario/interfaces/user-interface';
import { IntUrlActivate } from '@pages/gestion-usuario/interfaces/urlActivatedRoute.interface';


@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.scss']
})
export class GestionUsuarioComponent implements OnInit {
  displayedColumnsUsuario: string[] = ['id','cedula','nombres','apellidos','email','cargo'];
  columnsToDisplayWithExpandUsuario = [...this.displayedColumnsUsuario,'estado','accion'];
  dataSourceUsuario!: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  listaUsuario: Usuario[] = [];
  listaUrl: IntUrlActivate[] = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private paginatorLabel: MatPaginatorIntl,
    private _us: UsuarioService,
    private _gs : GeneralService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;
    this.paginatorLabel.itemsPerPageLabel = "Items por página"
    this.getUserLista();
  }

  getUserLista() {
    this._us.getUser().subscribe({
      next: (resp) => { 
        if (resp.data.length > 0) { this.datosUsuario(resp.data); }
      },
      error: (err) => {
        this._gs.alert( 'Problemas con listar usuario', '📛', 'red' );
      }
    });
  }

  datosUsuario(usuario : Usuario[]){
    this.listaUsuario = [];
    this.listaUsuario = usuario;
    this.dataSourceUsuario = new MatTableDataSource(this.listaUsuario);
    this.dataSourceUsuario.paginator = this.paginator;
    this.dataSourceUsuario.sort = this.sort;
    this.dataSourceUsuario.filterPredicate = this.filterBySubject();//filtra por objeto
  }

  filterBySubject() {
    let filterFunction = (usuario: Usuario, filter: string): boolean => {
      if (filter) {
        const subjects = usuario.persona;  //para objecto
        const cedula = subjects?.cedula || '';
        const nombres  = subjects?.nombres || '';
        const apellidos  = subjects?.apellidos || '';

        return cedula.indexOf(filter) !== -1 || nombres.indexOf(filter) !== -1 || apellidos.indexOf(filter) !== -1;

       /*  for (let i = 0; i < subjects.length; i++) {//para array
          if (subjects[i].indexOf(filter) != -1) {
            return true;
          }
        }
        return false; */
      } else {
        return true;
      }
    };  
    return filterFunction;
  }

  crearUsuarios() {
    const dialogRef = this.dialog.open(CrearEditarUsuarioComponent, {disableClose: true, width: '700px', height: '820px'});

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) { 
        this.getUserLista();
      }
    });
  }

  applyFilterUsuario(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsuario.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceUsuario.paginator) {
      this.dataSourceUsuario.paginator.firstPage();
    }
  }


  eliminarUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(DeleteModalComponent, { disableClose: true, data: {usuario, title: 'usuario'}, width: '600px'} );

    dialogRef.afterClosed().subscribe( (result) => {
      if (result != undefined) { 
        this.serviceDelete( parseInt(result) );
      }
    });
  }

  serviceDelete(id: number){
    this._us.deleteUser(id).subscribe({
      next: (resp) => { 
        if (resp.status) {
          this._gs.alert( resp.message, '🚀', 'green' );
          this.getUserLista();
        } else {
          this._gs.alert( resp.message, '📛', 'red' ); 
        }
      },
      error: (err) => {
        this._gs.alert( 'Problemas con eliminar usuario', '📛', 'red' );
      }
    })
  }
  
  editarUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(CrearEditarUsuarioComponent, { disableClose: true, data:usuario, width: '700px', height: '820px'} );
    
    dialogRef.afterClosed().pipe(delay(2000)).subscribe( (result : Usuario) => {
      if (result != undefined) { 
        this.getUserLista();
      }
    });
  }

}
