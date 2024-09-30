import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { GeneralService } from '@app/services/general.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  formEmpresa!: FormGroup;
  imagenDefault: string = 'user-default.jpg';
  activeImage: boolean = false;
  files: File[] = [];
  constructor(
    private _gs: GeneralService,private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initFormUsuario();
    this.mostrarEmpresa();
  }
  initFormUsuario() {
    this.formEmpresa = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],})
  }

  mostrarEmpresa(){

  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.activeImage = false;
    this.formEmpresa.get('imagen')?.setValue('');
  }
  
  onSelect(event: any) {
    if (!this.activeImage) {//
      this.files.push(...event.addedFiles);
      this.activeImage = true;
      this.formEmpresa.get('imagen')?.setValue(event.addedFiles[0].name);
    } else {
      this._gs.alert('Solo sube 1 imagen !!', '⚠️', 'warning');
    }
  }

  fieldsValidate(campo: string) {
    return this.formEmpresa.get(campo)?.invalid && this.formEmpresa.get(campo)?.touched;
  }
}
