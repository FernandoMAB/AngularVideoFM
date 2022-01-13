import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './equipos/equipos.component';
import { FiltroComponent } from './filtro/filtro.component';
import { PrestamosComponent } from './prestamos/prestamos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/equipos',
    pathMatch: 'full'
  },
  {
    path: 'equipos',
    component: EquiposComponent
  },
  {
    path: 'prestamos',
    component: PrestamosComponent
  },
  {
    path: 'filtro',
    component: FiltroComponent
  },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  

 }
