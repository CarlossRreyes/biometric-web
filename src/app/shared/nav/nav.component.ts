import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '@app/dialod-delete/delete-modal/delete-modal.component';
import { ToolService } from '@app/services/tool.service';
import { User } from '@auth/interfaces/auth-interface';
import { AuthService } from '@auth/services/auth.service';
import { PerfilComponent } from '@shared/perfil/perfil.component';
import { EmpresaComponent } from '../empresa/empresa.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  
})
export class NavComponent implements OnInit {

  @Input('user') user!:User;

  constructor(
    private _authSer : AuthService,
    private router : Router,
    public dialog: MatDialog,
    private _ts :ToolService
  ) { }

  ngOnInit(): void {
  //this.pintar();
  }

  salir(){
    this._authSer.deleteLocalStorage('token');
    this.router.navigate(['/login']);
  }

  pintar(){
    const imagen = this._authSer.tokenDecodificado.user.imagen;

     return this._ts.mostrarFile('usuarios',imagen).subscribe( {
      next : (resp) => {
        console.log(resp);
        
      },
      error : (err) => {
        console.log(err);
      }
    })
  }


  modalPerfil(){
    
    const dialogRef = this.dialog.open(PerfilComponent, { disableClose: true, data:this.user,  width: '700px', height: '620px'} );
     
    dialogRef.afterClosed().subscribe( (result : User) => {
      if (result != undefined) { 
        console.log(`Dialog editar perfil result: ${ result }`);
    
      }
    });
  }

  modalEmpresa(){
    const dialogRef = this.dialog.open(EmpresaComponent, { disableClose: true, data:this.user,  width: '700px', height: '620px'} );
     
    dialogRef.afterClosed().subscribe( (result : User) => {
      if (result != undefined) { 
        console.log(`Dialog Empresa result: ${ result }`);
    
      }
    });
  }

}
