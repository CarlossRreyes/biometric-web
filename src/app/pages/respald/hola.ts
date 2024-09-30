
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { IntitutionCountryCity } from '../../../interface/institution-country-city.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InstitutionService } from '../../../service/institution.service';
import { CreateInstitutionComponent } from '../../institution/create-institution/create-institution.component';
import { InstituteCountry } from '../../../interface/institution';
import { Country } from './../../../interface/country.interface';

import { TreeNode } from 'primeng/api';
import { Table } from 'primeng/table';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-crud-institutions',
  templateUrl: './crud-institutions.component.html',
  styleUrls: ['./crud-institutions.component.scss']
})
export class CrudInstitutionsComponent implements OnInit, OnDestroy {
  ref: DynamicDialogRef | undefined;

  groupData: any[] = [];

  files!: TreeNode[];
  cols!: Column[];

  @ViewChild('dt') dt!: Table;

  institutionCountryCity$: Observable<IntitutionCountryCity[]> = of([]);
  private unsubscribeGeneral$: Subject<void> = new Subject();

  constructor(
    public dialogService: DialogService,
    private _is : InstitutionService

  ){

  }

  ngOnInit(): void {
    this.getInstitutionCountCity();

    this.cols = [
      { field: 'name', header: 'País' },
      // { field: 'imagen', header: 'Imagen' },
      // { field: 'nombre_institution', header: 'Institución' },
      { field: 'nombre_provincia', header: 'Provincia' },
      // { field: 'nombre_ciudad', header: 'Ciudad' },
    ];
    
  }

  ngOnDestroy(): void {
    this.unsubscribeGeneral$.unsubscribe();
  }


  //******Data Institute********/
  getInstitutionCountCity(){
    this.institutionCountryCity$ = this._is.getInstitutionCountryCity().pipe(takeUntil(this.unsubscribeGeneral$));
    
    this.institutionCountryCity$.subscribe({
      next: ( resp ) => {
        if( resp.length > 0 ){
          this.groupData = this._is.groupData( resp );
        }else{
          this.groupData = [];
          
        }
      }
    })
  }

  showNewInstituteDialog(){
    this.ref = this.dialogService.open(CreateInstitutionComponent, {
      header: 'Crear Institucion',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  showEditInstituteDialog( institute: IntitutionCountryCity ){
    this.ref = this.dialogService.open( CreateInstitutionComponent , {
      header: 'Editar Institucion',
      data : institute,
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  getSeverity(state: string) {
    switch (state) {
      case 'A':
          
          return 'success';
      // case 'LOWSTOCK':
      //     return 'warning';
      case 'I':
          return 'danger';
      default: return 'warning'
    }
  }

}






//TODO: MIO
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IntIntitutionCountryCity, IntitutionCountryCity } from '../interface/institution-country-city.interface';
import { IntCountry, Country } from '../interface/country.interface';
@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  api = environment.apiUrl;

  constructor(
    private http : HttpClient
  ) { }


  getInstitutionCountryCity() : Observable<IntitutionCountryCity[]>{
    const url = `${this.api}/institucion/listarPorPaisCiudad`;
    return this.http.get<IntIntitutionCountryCity>(url).pipe( map( (resp) => resp.data ) );
  }

  //*********Group data institutions*********/
  groupData( institute: IntitutionCountryCity[] ): any[] {
    const groupedData: any[] = [];

    institute.map( ( item ) => {

      const nombre_pais = item.institucion_pais_ciudad[0].pais.nombre_pais;

      let paisNode = groupedData.find( (node) => node.data.name === nombre_pais );
      // console.log("Node pais: ", paisNode)
      if( !paisNode ){
        paisNode = {
          data: {
            name: `${ nombre_pais }`,
            nombre_provincia: '',
            nombre_ciudad: ''
            
          },
          children: []
        };
        
        groupedData.push( paisNode );
      }

      // item.institucion_pais_ciudad.map( (countriesInstitution) => {
      //   // const obj = {
      //   //   pais_id: item.institucion_pais_ciudad[0].pais_id,
      //   //   nombre_pais: nombre_pais,

      //   // }

      // })

      

      item.institucion_pais_ciudad.map( (itemProvincia) => {
        let provinciaNode = paisNode.children?.find( 
            (nodeP: any) => nodeP.data.name === `${ itemProvincia.provincia?.nombre_provincia }`);
        if( !provinciaNode ){
          provinciaNode = {
            data: {
              name: '',
              // nombre_provincia: `${ provinciaItem.provincia?.nombre_provincia }`,
              nombre_provincia: undefined ?  `${  itemProvincia.provincia?.nombre_provincia }` : "",
              // nombre_provincia: `${  itemProvincia.provincia?.nombre_provincia }`,
              nombre_ciudad: ''
            },
            children: []
          };
          paisNode.children?.push( provinciaNode );
        }

      })
     
      //***********INSTITUCIONES***********/
      // let nodeInstitute = paisNode.children?.find( (node: any) => node.data.name === `${ item.nombre }` );
      // if( !nodeInstitute ){
      //   nodeInstitute = {
      //     data: {
      //       name: '',
      //       nombre_institution: `${ item.nombre }`,
      //       // nombre_provincia: `${ item.institucion_pais_ciudad[0].provincia?.nombre_provincia }`,
      //       // nombre_ciudad: `${ item.institucion_pais_ciudad[0].ciudad?.nombre_ciudad }`
      //     },
      //     children: []
      //   };
      //   paisNode.children?.push( nodeInstitute )
      // }

      // if( !nodeInstitute ){
      //   nodeInstitute = {
      //     data: {
      //       name: '',
      //       nombre_institution: `${ item.nombre }`,
      //       nombre_provincia: `${ item.institucion_pais_ciudad[0].provincia?.nombre_provincia }`,
      //       nombre_ciudad: `${ item.institucion_pais_ciudad[0].ciudad?.nombre_ciudad }`
      //     },
      //     children: []
      //   };
      //   paisNode.children?.push( nodeInstitute )
      // }

      // item.institucion_pais_ciudad.map( (institute) => {

      // })



  


      

    });


    console.log("groupedData institutions : ", groupedData)
    return groupedData;
  }

  //************Load countries**********/
  getCountries(): Observable<Country[]>{
    const url = `${this.api}/pais/listarPaisProvCiu`;
    return this.http.get<IntCountry>(url).pipe( map( (resp) => resp.data ) );
  }


  //************Load provinces**********/
  getCountriesStatesCities(){
    const url = `${this.api}/pais/listarPaisProvCiu`;
    return this.http.get<IntCountry>(url);
  }

  //*********SAVE INSTITUTE******** */
  saveInstituteCountryProvinceCities(  ){
    
  }

  titlecase(name: string): string {
    return name.split(" ").map((l: string) => {
      if (l.length > 0) {
        return l[0].toUpperCase() + l.substring(1);
      } else {
        return "";
      }
    }).join(" ");
  }


  
  
}


tood: servuce 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { IntCountry, Country } from '../interface/country.interface';
import { IntUpdateCountryProvinceCity } from '../interface/update-country-province-city.interface';


@Injectable({
  providedIn: 'root'
})
export class ContryCityService {

  api = environment.apiUrl;

  constructor(
    private http : HttpClient
  ) { }

  getCountryProvinCity() : Observable<Country[]>{
    const url = `${this.api}/pais/listarPaisProvCiu`;
    return this.http.get<IntCountry>(url).pipe( map( (resp) => resp.data ) );
  }

  updateCountryProvinCity(data: IntUpdateCountryProvinceCity)  : Observable<any>{
    const url = `${this.api}/pais/updateGeneral`;
    return this.http.post<any>(url, data);
  }


  groupData(country : Country[]): any[]{
    const groupedData: any[] = [];

    country.map((item) => { 
      const nombre_pais = item.nombre_pais;

      const obj = { pais_id : item.id, nombre_pais : nombre_pais }
      
       // Buscar el pais en los datos agrupados
       let paisNode = groupedData.find((node) => node.data.name === nombre_pais);
       if (!paisNode) {
         paisNode = { 
           data: { 
             name: `${nombre_pais}`,
             nombre_provincia : '',
             nombre_ciudad : '',
             btn: 1, 
             editar : obj 
           }, 
           children: [] 
         };
         groupedData.push(paisNode);
       }

       item.provincia.map( (provinciaItem) => { 

        const obj = {
          pais_id : item.id,
          nombre_pais : nombre_pais,
          provincia_id : provinciaItem.id,
          nombre_provincia : provinciaItem.nombre_provincia,
        }

         // Buscar por provincia en los datos del laboratorio
          let provinciaNode = paisNode.children?.find(
              (node: any) => node.data.name  === `${provinciaItem.nombre_provincia}`);
          if (!provinciaNode) {
            provinciaNode = { 
              data: {
                  name: ` `,
                  nombre_provincia : `${provinciaItem.nombre_provincia}`,
                  nombre_ciudad : '',
                  btn: 2, 
                  editar : obj 
              }, 
              children: [] 
            };
            paisNode.children?.push(provinciaNode);
          }


          provinciaItem.ciudad.map( (ciudadItem) => {

            const obj = {
              pais_id : item.id,
              nombre_pais : nombre_pais,
              provincia_id : provinciaItem.id,
              nombre_provincia : provinciaItem.nombre_provincia,
              ciudad_id : ciudadItem.id,
              nombre_ciudad : ciudadItem.nombre_ciudad
            }

             // Buscar por provincia en los datos del laboratorio
            let ciudadNode = provinciaNode.children?.find((node: any) => node.data.name  === `${ciudadItem.nombre_ciudad}`);
            if (!ciudadNode) {
              ciudadNode = { 
                data: {
                    name: ` `,
                    nombre_provincia : ` `,
                    nombre_ciudad :  `${ciudadItem.nombre_ciudad}`,
                    btn: 3, 
                    editar : obj 
                }, 
                children: [] 
              };
              provinciaNode.children?.push(ciudadNode);
            }

          });
       });
     });

     console.log("GroupData: ", groupedData );

     return groupedData;
  }

}



