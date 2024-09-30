import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  titulo : string = ''; 
  datos : any;
  id : number = 0;
  

  constructor(
    public dialog : MatDialogRef<DeleteModalComponent>,//inyectamos nuestro dialogDeleteComponente
    @Inject(MAT_DIALOG_DATA) public data:any, //llega la data
  ) { }

  ngOnInit(): void {
    if (this.data != null) {      
      this.validando(this.data.title, this.data);
    }
  }

  validando(titulo : string, datos : any){
    switch (titulo) {
      case "usuario":
        this.id = datos.usuario.id;
        this.titulo = titulo;
        this.datos = `${datos.usuario.persona.nombres || '' } ${datos.usuario.persona.apellidos || ''}`;
        break;

      case "evento":
        this.id = datos.evento.id;
        this.titulo = titulo;
        this.datos = `${datos.evento.nombre}`;
        break;

        case "departamento":
          this.id = datos.departamento.id;
          this.titulo = titulo;
          this.datos = `${datos.departamento.nombre}`;
          break;
    
      default:
        break;
    }

  }

  close(){
    this.dialog.close();
  }





}
