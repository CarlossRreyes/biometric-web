import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Evento } from '../interfaces/evento.interface';
import { ToolService } from '@app/services/tool.service';
import { GeneralService } from '@app/services/general.service';
import { EventoserveService } from '../eventoserve.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.scss']
})
export class CrearEventoComponent implements OnInit {
  error: string = '';
  listadoSeleccionado: any;
  formEvento!: FormGroup;
  hide: boolean = true;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<CrearEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Evento,
    private _ts: ToolService,
    private _gs: GeneralService,
    private _es : EventoserveService
  ) { }

  ngOnInit(): void {
    this.initFormEvento();
    this.setEvento();
  }

  initFormEvento() {
    this.formEvento = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', [Validators.required]],
    });
  }

  setEvento() {
    if (this.data != null) {
      this.listadoSeleccionado = this.data;
      const { nombre, fecha } = this.data;
      const data: Evento = { nombre: this._gs.titlecase(nombre), fecha };
      this.formEvento.patchValue(data);
    } else {
      console.log("no data", this.data)
    }
  }

  fieldsValidate(campo: string) {
    return this.formEvento.get(campo)?.invalid && this.formEvento.get(campo)?.touched;
  }

  updateSaveEvento() {
    this.formEvento.markAllAsTouched();
    if (this.formEvento.invalid) { return; }

    if (this.listadoSeleccionado) {//editar

      let data: Evento = { ...this.formEvento.value, id: this.listadoSeleccionado.id }

      const obj = this.addObjeto(data);
      this.actualizarEvento(obj);
    } else {
      console.log("nuevo")
      const form: Evento = this.formEvento.value;
      const data = this.addObjeto(form);
      console.log("nuevo",data)
      this.registrarEvento(data);
    }
  }

  registrarEvento(data: { evento: Evento}) {
    this._es.saveEvento(data).subscribe({
      next: (resp) => {
        if (resp.status) {
          this._gs.alert(resp.message, '🚀', 'green');
        } else {
          this._gs.alert(resp.message, '📛', 'red');
        }
      },
      error: (err) => {
        this._gs.alert(err, '📛', 'red');
      },
    });
  }

  actualizarEvento(data: { evento: Evento }) {
    this._es.updateEvento(data).subscribe({
      next: (resp) => {
        if (resp.status) {
          this._gs.alert(resp.message, '🚀', 'green');
        } else {
          this._gs.alert(resp.message, '📛', 'red');
        }
      },
      error: (err) => {
        this._gs.alert(err, '📛', 'red');
      },
    });

   // console.log(data);

  }

  addObjeto(form: Evento) {
    let json = {
      evento: {
        id: form.id,
        nombre: form.nombre,
        fecha: form.fecha
      }
    }
    return json;
  }

  close() {
    this.dialog.close();
  }
}

