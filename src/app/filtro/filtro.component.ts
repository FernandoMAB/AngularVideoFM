import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposService } from '../servicesFirebase/equipos.service';
import { PrestamoService } from '../servicesFirebase/prestamo.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {

  multas: FormGroup;
  multasArray :multaInt [] =  [];
  equiposArray :any [] =  [];
  prestamosArray :any [] =  [];
  multaPorDia : number = 5;
  submitted = false;

  constructor(private fb: FormBuilder,private _equipoService: EquiposService,private _prestamoService: PrestamoService) { 
    this.multas = this.fb.group({
      StartDate: ['',Validators.required],
      EndDate: ['',Validators.required],
      
    })
  }

  ngOnInit(): void {
    this.getPrestamos();
    this.getEquipos();
  }

  doMultas(){
    this.submitted = true;
    if(this.multas.invalid){
      return;
    }
    this.multasArray = [];
    var todayDate = new Date();
    
    this.prestamosArray.forEach(element => {

      if(element.fechaEntrega == ''){

        this.equiposArray.forEach(elementE => {

          if(element.equipo == elementE.id && element.fechaIni >= this.multas.value.StartDate && element.fechaFin <= this.multas.value.EndDate && element.estado == 'Prestado'){

            var diff = this.calcularDias(element.fechaFin,todayDate);
            var multaCalculada = diff * this.multaPorDia;
            if(diff > 0){
              this.multasArray.push({
                equipo: elementE.nombre,
                usuario: element.usuario,
                dias: diff,
                multa: multaCalculada,
              })
            }

          }

        });
        
      }
    });
  }

  calcularDias(finPrestamo:Date,hoy:Date){
    //console.log('Calcular dias');
    let days = hoy.getTime() - finPrestamo.getTime();
    //console.log(hoy.getTime());
    //console.log(finPrestamo.getTime());
    //console.log(days);
    days = days/(1000*60*60*24);
    //console.log(days);

    let diferenciaDias = Math.trunc(days);
    return Number(diferenciaDias);
  }
  

  getPrestamos(){
    this._prestamoService.getPrestamos().subscribe(data =>{
      this.prestamosArray = [];
      data.forEach((element:any) => {
        this.prestamosArray.push({
          id: element.payload.doc.id,
          fechaIni: element.payload.doc.data().fechaIni.toDate(),
          fechaFin: element.payload.doc.data().fechaFin.toDate(),
          fechaEntrega: element.payload.doc.data().fechaEntrega,
          usuario: element.payload.doc.data().usuario,
          estado: element.payload.doc.data().estado,
          equipo: element.payload.doc.data().equipo
        })
      });
    })
  }

  getEquipos(){
    this._equipoService.getEquipos().subscribe(data =>{
      this.equiposArray = [];
      data.forEach((element:any) => {
        this.equiposArray.push({
          id: element.payload.doc.id,
          nombre: element.payload.doc.data().nombre,
        })
      });
    })
  }

  displayedColumns: string[] = ['equipo', 'usuario','dias','multa'];
}

export interface multaInt{
  equipo: string,
  usuario: string,
  dias: number,
  multa: number,
}
