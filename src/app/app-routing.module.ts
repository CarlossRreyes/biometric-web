import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from '@app/components/no-page-found/no-page-found.component';

import { AuthGuard } from '@auth/guards/auth.guard';
import { AutoLoginGuard } from '@auth/guards/auto-login.guard';

const routes: Routes = [
  { path : '', redirectTo: '/login', pathMatch : 'full'},
  { path:'login', loadChildren: () => import('@auth/auth.module').then(m =>m.AuthModule), canActivate : [AutoLoginGuard] },
  { path:'home', loadChildren: () => import('@pages/pages.module').then(m =>m.PagesModule), canActivate : [AuthGuard] },
  { path: '404', component: NoPageFoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }