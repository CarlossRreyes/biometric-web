import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Menu, User } from '@auth/interfaces/auth-interface';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy  {

  @ViewChild('me') me!:ElementRef<HTMLElement>;

  public user!: User;
  public menu : Menu [] = [];
  private payloadServiceSubscription: Subscription | undefined;

  constructor(
    private renderer : Renderer2,
    private _auSer : AuthService
  ) { }

  ngOnInit(): void {
    //console.log('pages ts', this._auSer.tokenDecodificado);

    this.payloadServiceSubscription = this._auSer.$getObjSourcePayload.subscribe( (resp) => {
      this.user = resp.user;
      this.menu = resp.menu;
    });
    this.user = this._auSer.tokenDecodificado.user;
    this.menu = this._auSer.tokenDecodificado.menu; 
  }

  ngOnDestroy(): void {
    this.payloadServiceSubscription?.unsubscribe();
  }

  openCloseMenu(){    
    const m = this.me.nativeElement.classList.contains('m');
    let ele = this.me.nativeElement;

    if (m) {
      this.addClass(ele, 'toggle-sidebar');
      this.removeClass(ele, 'm');
    } else {
      this.removeClass(ele, 'toggle-sidebar');
      this.addClass(ele, 'm');
    }
  }

  addClass(ele: HTMLElement, name: string){
    this.renderer.addClass(ele,name);
  }

  removeClass(ele: HTMLElement, name: string){
    this.renderer.removeClass(ele,name);
  }

}
