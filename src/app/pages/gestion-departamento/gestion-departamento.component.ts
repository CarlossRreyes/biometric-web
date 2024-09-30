import { Component, OnInit, ViewChild } from '@angular/core';
import { Departamento } from './interfaces/departamento.interface';
import { DepartamentoserviceService } from './departamentoservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GeneralService } from '@app/services/general.service';
import { IntUrlActivate } from '../gestion-usuario/interfaces/urlActivatedRoute.interface';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CrearDepartamentoComponent } from './crear-departamento/crear-departamento.component'; 
import { delay } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DeleteModalComponent } from '@app/dialod-delete/delete-modal/delete-modal.component';



@Component({
  selector: 'app-gestion-departamento',
  templateUrl: './gestion-departamento.component.html',
  styleUrls: ['./gestion-departamento.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
],
})
export class GestionDepartamentoComponent implements OnInit {

  /**********LIST*************/
  listaDepartamento: Departamento[] = [];
  listaUrl: IntUrlActivate[] = [];

  /******MATCH TABLE && COLUMNS*********** */
  dataSourceDepartamento!: MatTableDataSource<Departamento>;  

  displayedColumnsDepartamento: string[] = ['id','nombre','estado'];
  columnsToDisplayWithExpandDepartamento = [...this.displayedColumnsDepartamento, 'accion', 'expand'];
  expandedElementDepartamento!: Departamento | null;


  /*******VIEW CHILD*********/
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _departamentoService: DepartamentoserviceService,
    private _gs : GeneralService,
    private rutaActiva: ActivatedRoute,
    private dialog: MatDialog
    
  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;
    this.getDepartamentos();
  }


  /***********CARGAR DEPARAMENTOS************ */
  getDepartamentos(){
    this._departamentoService.getAllDepartaments().subscribe({
      next: (res) => {
        if(res.data.length > 0){
          this.datosDepartamento(res.data);
        }
      },
      error: (err) => {
        this._gs.alert( 'Problemas al listar los departamentos', '📛', 'red' );
      }
    });

  }

  datosDepartamento(departamento : Departamento[]){
    this.listaDepartamento = [];
    this.listaDepartamento = departamento;
    this.dataSourceDepartamento = new MatTableDataSource(this.listaDepartamento);
    this.dataSourceDepartamento.paginator = this.paginator;
    this.dataSourceDepartamento.sort = this.sort;
  }
 
  crearDepartamento(){
    const dialogRef = this.dialog.open(CrearDepartamentoComponent, { disableClose: true, width: '700px', height: '650px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.getDepartamentos();
      }
    });
  }

  editarDepartamento(departamento: Departamento){
    const dialogRef = this.dialog.open(CrearDepartamentoComponent, { disableClose: true, data:departamento, width: '700px', height: '650px'} );
    
    dialogRef.afterClosed().pipe(delay(2000)).subscribe( (result : Departamento) => {
      if (result != undefined) { 
        this.getDepartamentos();
      }
    });
                                                           
  }

  eliminarDepartamento(departamento: Departamento){
    const dialogRef = this.dialog.open(DeleteModalComponent, { disableClose: true, data: {departamento, title: 'departamento'}, width: '600px'} );

    dialogRef.afterClosed().subscribe( (result) => {
      if (result != undefined) { 
        this.serviceDelete( parseInt(result) );
      }
    });
    
  }

  serviceDelete(id:number){
    
    this._departamentoService.deleteDepartament(id).subscribe({
      next: (resp) => { 
        if (resp.status) {
          this._gs.alert( resp.message, '🚀', 'green' );
          this.getDepartamentos();
        } else {
          this._gs.alert( resp.message, '📛', 'red' ); 
        }
      },
      error: (err) => {
        this._gs.alert( 'Problemas con eliminar un departamento', '📛', 'red' );
      }
    })
  }

  applyFilterDepartamento(event: any){

  }

}
