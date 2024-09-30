import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.scss'],
  providers : [ RouterLink ]
})
export class NoPageFoundComponent {

  constructor() { }

  ngOnInit(): void {
  }

}
