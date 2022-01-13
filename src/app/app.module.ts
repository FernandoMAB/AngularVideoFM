import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

//import { AngularFireModule } from '@angular/fire/compat';
//import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { EquiposComponent } from './equipos/equipos.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { FiltroComponent } from './filtro/filtro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EquiposComponent,
    PrestamosComponent,
    FiltroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFirestoreModule.enablePersistence(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
