import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { IntDataUser } from '@auth/interfaces/auth-interface';
import { GeneralService } from '@app/services/general.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  formLogin!: FormGroup;
  hide : boolean = true;
  sppiner : boolean = false;
  error: string = '';
 
  constructor(
    private fb: FormBuilder,
    private router : Router,
    private _auSer: AuthService,
    private _gs : GeneralService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    this.formLogin = this.fb.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
  }

  fieldsValidate(campo: string) {
    return this.formLogin.get(campo)?.invalid && this.formLogin.get(campo)?.touched;
  }

  /* errorHandling(campo: string): string {
    const errors = this.formLogin.controls[campo]?.errors;
    if (errors?.['required']) {
      return  this.error = `El ${campo} es requerido`;
    }else if (errors?.['pattern']) {
      return this.error = `El ${campo} no tiene formato correcto`;
    }else if(errors?.['minlength']){
      return this.error = `El ${campo} deber tener mínimo 6 caracteres`;
    }
    return this.error;
  } */

  login(){
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) { return; }

    if (this.formLogin.valid) {
      this.sppiner = true;
      const form : IntDataUser = this.formLogin.value; 
      this.loginAcceso(form);
    }
  }

  loginAcceso(data: IntDataUser){
    this._auSer.login(data).subscribe({
      next: (resp) => { 
        if (resp.status) {
          this.sppiner = false;
          this._gs.alert( resp.message, '🚀', 'green' );
          this.router.navigate(['/home']);  
        }else {
          //this._gs.alert( resp.message, '⚠️', 'warning' );
          this._gs.alert( resp.message, '📛', 'red' );
          this.sppiner = false;
        }
      }, 
      error: (err) => { console.log(err); },
      complete : () => { this.sppiner = false }
    });  
  }

  

}
