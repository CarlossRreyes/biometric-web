import { Component, Input, OnInit } from '@angular/core';

import { Menu } from '@auth/interfaces/auth-interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles : [ ` `],
 
})
export class SidebarComponent implements OnInit {

  @Input() menu : Menu[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
