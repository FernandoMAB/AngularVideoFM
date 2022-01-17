import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private firestore: AngularFirestore) { }


  addEquipo(equipo: any): Promise<any>{
    return this.firestore.collection('equipos').add(equipo);
  }

  getEquipos(): Observable <any>{
    return this.firestore.collection('equipos', ref =>ref.orderBy('nombre','asc')).snapshotChanges();
  }
  deleteEquipo(id: string): Promise <any> {
    return this.firestore.collection('equipos').doc(id).delete();
  }

  getEquipo(id: string): Observable <any>{
    return this.firestore.collection('equipos').doc(id).snapshotChanges();
  }

  updateEquipo(id: string, data: any): Promise <any>{
    return this.firestore.collection('equipos').doc(id).update(data);
  }

}
