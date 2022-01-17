import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEquipoComponent } from './create-equipo/create-equipo.component';
import { CreatePrestamosComponent } from './create-prestamos/create-prestamos.component';
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
    path: 'multas',
    component: FiltroComponent
  },
  {
    path: 'create-equipo',
    component: CreateEquipoComponent
  },
  {
    path: 'edit-equipo/:id',
    component: CreateEquipoComponent
  },
  {
    path: 'create-prestamo',
    component: CreatePrestamosComponent
  },
  {
    path: 'edit-prestamo/:id',
    component: CreatePrestamosComponent
  },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  

 }
