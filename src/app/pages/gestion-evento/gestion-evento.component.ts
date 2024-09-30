import { Component, OnInit, ViewChild } from '@angular/core';
import { IntUrlActivate } from '../gestion-usuario/interfaces/urlActivatedRoute.interface';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { EventoserveService } from './eventoserve.service';
import { Evento } from './interfaces/evento.interface';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GeneralService } from '@app/services/general.service';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '@app/dialod-delete/delete-modal/delete-modal.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-gestion-evento',
  templateUrl: './gestion-evento.component.html',
  styleUrls: ['./gestion-evento.component.scss']
})

export class GestionEventoComponent implements OnInit {
  listaUrl: IntUrlActivate[] = [];
  listaEvento: Evento[] = [];

  displayedColumnsEvento: string[] = ['id', 'nombre', 'fecha', 'estado'];
  columnsToDisplayWithExpandEvento = [...this.displayedColumnsEvento, 'accion'];
  dataSourceEvento!: MatTableDataSource<Evento>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;


  constructor(
    private rutaActiva: ActivatedRoute,
    private _evser: EventoserveService,
    private paginatorLabel: MatPaginatorIntl,
    private _gs: GeneralService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listaUrl = this.rutaActiva.snapshot.url;
    this.getEvento();
  }

  getEvento() {
    this._evser.getEvento().subscribe({
      next: (resp) => {
        if (resp.data.length > 0) {
          this.isLoading = false;
          this.datosEvento(resp.data);
        }
      },
      error: (err) => {
        this._gs.alert('Problemas con listar evento', '📛', 'red');
      }
    });
  }

  datosEvento(evento: Evento[]) {
    this.listaEvento = [];
    this.listaEvento = evento;
    this.dataSourceEvento = new MatTableDataSource(this.listaEvento);
    this.dataSourceEvento.paginator = this.paginator;
    this.dataSourceEvento.sort = this.sort;
  }

  crearEvento() {
    const dialogRef = this.dialog.open(CrearEventoComponent, { disableClose: true, width: '500px', height: '450px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.getEvento();
      }
    });
  }

  editarEvento(usuario: Evento) {
    const dialogRef = this.dialog.open(CrearEventoComponent, { disableClose: true, data: usuario, width: '500px', height: '450px' });

    dialogRef.afterClosed().pipe(delay(2000)).subscribe((result: Evento) => {
      if (result != undefined) {
        this.getEvento();
      }
    });
  }

  applyFilterEvento(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEvento.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEvento.paginator) {
      this.dataSourceEvento.paginator.firstPage();
    }

  }



  eliminarEvento(evento: Evento) {
    const dialogRef = this.dialog.open(DeleteModalComponent, { disableClose: true, data: { evento, title: 'evento' }, width: '600px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.serviceDelete(parseInt(result));
      }
    });
  }

  serviceDelete(id: number) {
    this._evser.deleteEvento(id).subscribe({
      next: (resp) => {
        if (resp.status) {
          this._gs.alert(resp.message, '🚀', 'green');
          this.getEvento();
        } else {
          this._gs.alert(resp.message, '📛', 'red');
        }
      },
      error: (err) => {
        this._gs.alert('Problemas con eliminar evento', '📛', 'red');
      }
    })
  }



}
