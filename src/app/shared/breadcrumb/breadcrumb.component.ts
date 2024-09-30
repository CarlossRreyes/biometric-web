import { Component, Input, OnInit } from '@angular/core';
import { IntUrlActivate } from '@app/pages/gestion-usuario/interfaces/urlActivatedRoute.interface';

interface Url {
  path :string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
 
  @Input() listaUrl : IntUrlActivate [] = [];
  titulo : string = '';
  newListaUrl : Url [] = [];

  constructor() { }

  ngOnInit(): void {
    this.titulo = this.listaUrl[0].path.replace('-',' ') || '';

    this.listaUrl.forEach( (item) => { 
      this.newListaUrl.push( { path : item.path.replace('-', ' ') } );
    });
  }

}
