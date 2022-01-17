import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../servicesFirebase/prestamo.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent implements OnInit {

  prestamosArray :any [] =  [];

  constructor(private _prestamoService: PrestamoService) { }

  ngOnInit(): void {
    this.getPrestamos();
  }

  getPrestamos(){
    this._prestamoService.getPrestamos().subscribe(data =>{
      this.prestamosArray = [];
      var datePipe = new DatePipe("en-US");
      data.forEach((element:any) => {
        var date;
        if(element.payload.doc.data().fechaEntrega == '' || element.payload.doc.data().fechaEntrega == null){
            date = 'N/A';
        }else{
          date = datePipe.transform(element.payload.doc.data().fechaEntrega.toDate(), 'dd/MM/yyyy');
        }
        this.prestamosArray.push({
          id: element.payload.doc.id,
          fechaIni: element.payload.doc.data().fechaIni.toDate(),
          fechaFin: element.payload.doc.data().fechaFin.toDate(),
          fechaEntrega: date,
          usuario: element.payload.doc.data().usuario,
          estado: element.payload.doc.data().estado,
          equipo: element.payload.doc.data().equipo
        })
      });
    })
  }

  deletePrestamos(id:string){
    this._prestamoService.deletePrestamo(id).then(()=>{
      console.log('Prestamo eliminado!');
    }).catch(error =>{
      console.log(error);
    })
  }

  displayedColumns: string[] = ['fechaIni', 'fechaFin', 'fechaEntrega', 'usuario', 'estado', 'equipo','action'];
}
