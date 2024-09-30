import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Departamento, Geo, GeolocalizacionDepartamento, crearUpdateDepartamento} from '../interfaces/departamento.interface';
import { DepartamentoserviceService } from '../departamentoservice.service';
import { GeneralService } from '@app/services/general.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-crear-departamento',
  templateUrl: './crear-departamento.component.html',
  styleUrls: ['./crear-departamento.component.scss']
})
export class CrearDepartamentoComponent implements OnInit {
  listadoSeleccionado: any;

  formDepartamento!: FormGroup;
  hasLocationAccess!: boolean;

  displayedColumnsDepartamento: string[] = ['#', 'lat', 'log'];
  columnsToDisplayWithExpandDepartamento = [...this.displayedColumnsDepartamento, 'accion'];
  dataSourceGeolocalizacion!: MatTableDataSource<Departamento>;

  btnCapLocalizacion: boolean = true;
  btnAddLocalizacion: boolean = false;
  misCoordenadasInput: boolean = false;
 
  geolocalizacion = new FormControl();
  newArrayGeolocalizaciones: Departamento[] = [];//pintar la tabla

  constructor(
    public dialog: MatDialogRef<CrearDepartamentoComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Departamento,
    private serviceDep: DepartamentoserviceService,
    private _gs: GeneralService,
     
  ) { }

  ngOnInit(): void {
    this.initFormUsuario();
    this.setDepartamento();
  }

  initFormUsuario() {
    this.formDepartamento = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      lat: [''],//settear el input
      log: [''],//settear el input
      geolocalizaciones: this.fb.array([], [Validators.required])//pintar tos input de lat y log - table
    });
  }

  capturarLocalizacion() {//crea o cuando actualicen y quiere add otra ubicafcion
    this.serviceDep.getLocationPromise().then((coords: any) => {
      this.formDepartamento.get('lat')?.setValue(coords[0]);
      this.formDepartamento.get('log')?.setValue(coords[1]);
      this.btnCapLocalizacion = false;
      this.btnAddLocalizacion = true;
      this.misCoordenadasInput = true;
    });
  }

  addUbicaciones() {//crea o cuando actualicen y quiere add otra ubicafcion
    const form = this.formDepartamento.value;

    if (form.lat == '' || form.log == '') { return; }

    const arrayGeolocalizaciones = <FormArray>this.formDepartamento.get('geolocalizaciones');
    const obj: Geo = { lat: form.lat, log: form.log };

    if (arrayGeolocalizaciones.controls.length > 0) {//valida si esta repetido y add
      let i: number = 0;
      arrayGeolocalizaciones.controls.forEach( (item: AbstractControl) => {
        if (item.value.lat === obj.lat && item.value.log === obj.log) {
          this._gs.alert('Ya existe la ubicación, intente de nuevo', '📛', 'red');
          arrayGeolocalizaciones.removeAt(i);
          return;
        }
        i++;
      });
      arrayGeolocalizaciones.push(new FormControl(obj));
      this.newArrayGeolocalizaciones = arrayGeolocalizaciones.value;
    } else {//add por primera vez
      arrayGeolocalizaciones.push(new FormControl(obj));
      this.newArrayGeolocalizaciones = arrayGeolocalizaciones.value;
    }
    this.dataSourceGeolocalizacion = new MatTableDataSource(this.newArrayGeolocalizaciones);
    this.formDepartamento.get('lat')?.setValue('');
    this.formDepartamento.get('log')?.setValue('');
    this.btnCapLocalizacion = true;
    this.btnAddLocalizacion = false;
    this.misCoordenadasInput = false;
  }

  updateSaveDepartamento() {
    this.formDepartamento.markAllAsTouched();
    if (this.formDepartamento.invalid) { return; }

    if (this.listadoSeleccionado) {//editar
      const form = {...this.formDepartamento.value, id : this.listadoSeleccionado.id}
      const arrayGeolocalizaciones = <FormArray>this.formDepartamento.get('geolocalizaciones');

      let data = this.addObj(form,arrayGeolocalizaciones.value); 
      this.actualizandoDepartamento(data);
    } else {//crear

      const form = this.formDepartamento.value;
      const arrayGeolocalizaciones = <FormArray>this.formDepartamento.get('geolocalizaciones');
      let data = this.addObj(form,arrayGeolocalizaciones.value); 
      this.registrarDepartamento(data);
    }
  }


  addObj(form:any, arrayGeo : any) : crearUpdateDepartamento{
    let nombreDepartamento = { nombre:form.nombre }

    if (form.id) {//actualizar
      const departamentoConID = { ...nombreDepartamento, id : form.id };

      let json : crearUpdateDepartamento = {
        departamento:departamentoConID, 
        geolocalizacion_departamento: arrayGeo
      }
      return json;
    }else {
      let json : crearUpdateDepartamento = {
        departamento:nombreDepartamento, 
        geolocalizacion_departamento: arrayGeo
      }
      return json;
    }
  }

  registrarDepartamento(data:crearUpdateDepartamento){
    this.serviceDep.createDepartament(data).subscribe({
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


  eliminaGeolocalizacion(data: GeolocalizacionDepartamento) {
    const arrayGeolocalizaciones = <FormArray>this.formDepartamento.get('geolocalizaciones');

    arrayGeolocalizaciones.controls.forEach((item, index) => {
      if (item.value.lat === data.lat && item.value.log === data.log) {
        arrayGeolocalizaciones.removeAt(index);
        this.newArrayGeolocalizaciones = arrayGeolocalizaciones.value;
        this.dataSourceGeolocalizacion = new MatTableDataSource(this.newArrayGeolocalizaciones);
        return;
      }
    });
  }

  actualizandoDepartamento(data: crearUpdateDepartamento) {
    this.serviceDep.updateDepartament(data).subscribe({
      next: (resp) => {
        if (resp.status) {
          this.formDepartamento.reset();
          this._gs.alert(resp.message, '🚀', 'green');
        }
      },
      error: (err) => {
        this._gs.alert(err, '📛', 'red');
      },
    });
  }

  setDepartamento() {
    if (this.data != null) {
      this.listadoSeleccionado = this.data;

      this.formDepartamento.get('nombre')?.setValue(this.data.nombre);

      const arrayGeolocalizaciones = <FormArray>this.formDepartamento.get('geolocalizaciones');

      this.data.geolocalizacion_departamento?.forEach((item: any) => {
        const obj: any = { lat: item.lat, log: item.log };
        arrayGeolocalizaciones.push(new FormControl(obj));
        this.newArrayGeolocalizaciones = arrayGeolocalizaciones.value;
        this.dataSourceGeolocalizacion = new MatTableDataSource(this.newArrayGeolocalizaciones);
      });

    }
  }


  fieldsValidate(campo: string) {
    return this.formDepartamento.get(campo)?.invalid && this.formDepartamento.get(campo)?.touched;
  }

  close() {
    this.dialog.close();

  }



  //sin utilizar
  capturarLocalizacionParaunasolavezconobservable() {
    if (this.serviceDep.hasLocation) {//true
      const position = this.serviceDep.locationSubject.getValue();

      if (position) {
        this.formDepartamento.get('lat')?.setValue(position.coords.latitude);
        this.formDepartamento.get('log')?.setValue(position.coords.longitude);
        this.btnCapLocalizacion = false;
        this.btnAddLocalizacion = true;
        this.misCoordenadasInput = true;
      }
    } else {//false
      this.serviceDep.getLocation().subscribe({
        next: (position: GeolocationPosition | null) => {
          if (position) {
            this.formDepartamento.get('lat')?.setValue(position.coords.latitude);
            this.formDepartamento.get('log')?.setValue(position.coords.longitude);
            this.btnCapLocalizacion = false;
            this.btnAddLocalizacion = true;
            this.misCoordenadasInput = true;
          }
        }, error: (err) => { console.log('Geolocation error:', err); }
      }
      );
    }
  }



}
