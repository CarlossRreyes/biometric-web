import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { User } from '@auth/interfaces/auth-interface';
import { Rol, UserPersonEdSav } from '@pages/gestion-usuario/interfaces/user-interface';
import { errores } from '@pages/gestion-usuario/interfaces/formValidation.interface';

import { GeneralService } from '@app/services/general.service';
import { ToolService } from '@app/services/tool.service';
import { UsuarioService } from '@pages/gestion-usuario/usuario.service';
import { Sexo } from '../interfaces/sexo.interface';


@Component({
  selector: 'app-crear-editar-usuario',
  templateUrl: './crear-editar-usuario.component.html',
  styleUrls: ['./crear-editar-usuario.component.scss'],
})
export class CrearEditarUsuarioComponent implements OnInit {
  error: string = '';

  formUsuario!: FormGroup;
  imagenDefault: string = 'user-default.jpg';
  activeImage: boolean = false;
  files: File[] = [];
  listadoSeleccionado: any;
  base64Image: string = '';
  listaRoles: Rol[] = [];
  hide : boolean = true;

  listaSexo : Sexo []=[];

  

  constructor(
    private _gs: GeneralService,
    private fb: FormBuilder,
    private _us: UsuarioService,
    public dialog: MatDialogRef<CrearEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private _ts: ToolService,
  ) {

  }

  ngOnInit(): void {
    this.initFormUsuario();
    this.getTiposRoles();
    this.mostrarSexo();
    this.setUsuario();
  }

  initFormUsuario() {
    this.formUsuario = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      num_celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      rol_id: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      direccion: [''],
      imagen: [''],
      sexo_id: ['', [Validators.required]]
    });
  }

  setUsuario() {
    if (this.data != null) {
      this.listadoSeleccionado = this.data; 
      this.serviceImagen(this.data.imagen);
      //desestructuracion de objecto
      const { name, email, imagen, rol_id , persona : { cedula, nombres, apellidos ,num_celular, direccion , sexo_id}  } = this.data;
    
      //unir las const de todo los objecto desestructurado
      const data = { name, email, imagen, rol_id , cedula, nombres, apellidos, num_celular, direccion, sexo_id };

      //setear el formulario
      this.formUsuario.patchValue(data);
    }
  }

  getTiposRoles() {
    this._us.getTiposRoles().subscribe({
      next: (resp) => { this.listaRoles = resp.data; },
      error: (err) => { console.log(err); }
    });
  }

  mostrarSexo() {
    this._us.getSexo().subscribe({
      next: (resp) => { this.listaSexo = resp.data; },
      error: (err) => { console.log(err); }
    });
  }

  updateSaveUsuario() {
    this.formUsuario.markAllAsTouched();
    if (this.formUsuario.invalid) { return; }

    if (this.listadoSeleccionado) {//editar

      let data: UserPersonEdSav = {
        ...this.formUsuario.value,
        user_id: this.listadoSeleccionado.id,
        persona_id: this.listadoSeleccionado.persona.id,
      }

      if (data.imagen === this.imagenDefault || data.imagen === '') {
        const obj = this.addObjeto(data);
        this.actualizandoUser(obj);
      } else {
        this._ts.subirArchivo(this.files, 'img_user', 'subirArchivo').subscribe((res: any) => {
          if (res.status) {
            let obj = this.addObjeto(data);
            this.actualizandoUser(obj);
      
            const index = this.files[0].name.indexOf( obj.usuario.imagen ?? '', 1);
            this.files.splice(index, 1);
            this.activeImage = false;
          }
        });
      }
    } else {//crear
      const form: UserPersonEdSav = this.formUsuario.value;
      const data = this.addObjeto(form);
      this.registrarUsuario(data);
    }
  }

  registrarUsuario(data: { usuario: UserPersonEdSav, persona: UserPersonEdSav }) {
    this._us.saveUser(data).subscribe({
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

  actualizandoUser(data: { usuario: UserPersonEdSav, persona: UserPersonEdSav }) {
    this._us.updateUser(data).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.formUsuario.reset();
          this._gs.alert(resp.message, '🚀', 'green');
        }
      },
      error: (err) => {
        this._gs.alert(err, '📛', 'red');
      },
    });
  }
 
   addObjeto(form: UserPersonEdSav): { usuario: UserPersonEdSav, persona: UserPersonEdSav } {

    let usuario : UserPersonEdSav = {
      rol_id: form.rol_id,
      name: form.name,
      email: form.email,
      imagen: (this.activeImage) ? form.imagen : 'user-default.jpg',
      password: form.password
    };
  
    let persona : UserPersonEdSav =  {
      cedula: form.cedula,
      nombres: form.nombres,
      apellidos: form.apellidos,
      num_celular: form.num_celular,
      direccion: form.direccion,
      sexo_id : form.sexo_id
    };
  
    if (form.user_id) {//actualizar
      let usuarioConID: UserPersonEdSav = { ...usuario, user_id : form.user_id };
      let personaConID: UserPersonEdSav = { ...persona, persona_id: form.persona_id }; 

      return { usuario: usuarioConID, persona: personaConID };
    } else {//registrar
      return { usuario: usuario, persona : persona }; 
    }
  }

  close(){
    this.dialog.close();
  }

  fieldsValidate(campo: string) {
    return this.formUsuario.get(campo)?.invalid && this.formUsuario.get(campo)?.touched;
  }

  onSelect(event: any) {
    if (!this.activeImage) {//
      this.files.push(...event.addedFiles);
      this.activeImage = true;
      this.formUsuario.get('imagen')?.setValue(event.addedFiles[0].name);
    } else {
      this._gs.alert('Solo sube 1 imagen !!', '⚠️', 'warning');
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.activeImage = false;
    this.formUsuario.get('imagen')?.setValue('');
  }
  
  serviceImagen(imagen: string) {
    this._ts.mostrarArchivo('usuarios', imagen).subscribe({
      next: (blob) => { this.convertirFileReader(blob) },
      error: (err) => { console.log(err) }
    });
  }
 
  convertirFileReader(blob: any) {
    const reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      this.base64Image = reader.result as string;

      if (this.base64Image != '') {
        const arrayBufferFromBase64 = this.convertDataURIToBinary(this.base64Image);
        const imagemAsFile = new File([arrayBufferFromBase64], 'new-imagem', { type: 'image/png' });
        this.files.push(imagemAsFile);
        this.activeImage = true;
      }
    }
  }

  convertDataURIToBinary(dataURI: string) {//funcional 
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  errorHandling2(campo: string): string {
    const errors = this.formUsuario.controls[campo]?.errors;

    if (errors?.['required']) {
      campo = campo.replace('rol_id', 'rol').replace('num_celular', 'número celular')
        .replace('name', 'usuario').replace('nombres', 'nombre').replace('apellidos', 'apellido')
        .replace('cedula', 'cédula').replace('email', 'correo');
      return this.error = `El ${campo} es requerido`;

    } else if (errors?.['pattern'] && campo == 'email') {
      campo = campo.replace('email', 'correo');
      return this.error = `El ${campo} no tiene formato correcto`;

    } else if (errors?.['pattern'] && (campo == 'nombres' || campo == 'apellidos')) {
      campo = campo.replace('nombres', 'nombre').replace('apellidos', 'apellido');
      return this.error = `El ${campo} no puede tener caracteres especiales y numéricos`;

    } else if (errors?.['pattern'] && campo == 'num_celular') {
      campo = campo.replace('num_celular', 'número celular');
      return this.error = `${campo} no válido..!`;

    } else if (errors?.['minlength'] && (campo == 'nombres' || campo == "apellidos" || campo == 'name')) {
      campo = campo.replace('name', 'usuario').replace('nombres', 'nombre').replace('apellidos', 'apellido');
      return this.error = `El ${campo} deber tener mínimo 3 caracteres`;

    } else if (errors?.['minlength'] && (campo == 'num_celular' || campo == 'cedula')) {
      campo = campo.replace('num_celular', 'número celular').replace('cedula', 'cédula');
      return this.error = `El ${campo} deber tener mínimo 10 caracteres`;

    } else if (errors?.['cedula']) {
      campo = campo.replace('cedula', 'cédula');
      return this.error = `Ingrese una ${campo} válida`;
    }
    return this.error;
  }

  errorHandling(campo: string): string {
    const errors = this.formUsuario.controls[campo]?.errors;
    const campoError = errores[campo];

    if (errors?.['required'] && campoError?.['required']) {
      return  this.error = campoError?.['required']
    }else if (errors?.['minlength'] && campoError?.['minlength']){
      return this.error = campoError?.['minlength'];
    }else if (errors?.['pattern'] && campoError?.['pattern']){
      return this.error = campoError?.['pattern'];
    }else if (errors?.['cedula'] && campoError?.['cedula']) {
      return this.error = campoError?.['cedula'];
    }
    return this.error;
  }

  


}
