import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(private firestore: AngularFirestore) { }

  addPrestamo(prestamo: any): Promise<any>{
    return this.firestore.collection('prestamo').add(prestamo);
  }

  getPrestamos(): Observable <any>{
    return this.firestore.collection('prestamo', ref =>ref.orderBy('fechaIni','asc')).snapshotChanges();
  }
  deletePrestamo(id: string): Promise <any> {
    return this.firestore.collection('prestamo').doc(id).delete();
  }

  getPrestamo(id: string): Observable <any>{
    return this.firestore.collection('prestamo').doc(id).snapshotChanges();
  }

  updatePrestamo(id: string, data: any): Promise <any>{
    return this.firestore.collection('prestamo').doc(id).update(data);
  }
}
