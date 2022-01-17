import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../servicesFirebase/equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent implements OnInit {
  equiposArray :any [] =  [];
  constructor(private _equipoService: EquiposService) { }

  ngOnInit(): void {
    this.getEquipos();
    console.log(this.equiposArray)
  }

  getEquipos(){
    this._equipoService.getEquipos().subscribe(data =>{
      this.equiposArray = [];
      data.forEach((element:any) => {
        this.equiposArray.push({
          id: element.payload.doc.id,
          nombre: element.payload.doc.data().nombre,
          creationDate: element.payload.doc.data().creationDate,
          modificationDate: element.payload.doc.data().modificationDate
        })
        console.log(this.equiposArray)
      });
    })
  }

  deleteEquipo(id:string){
    this._equipoService.deleteEquipo(id).then(()=>{
      console.log('Equipo eliminado!');
    }).catch(error =>{
      console.log(error);
    })
  }
  displayedColumns: string[] = ['id', 'nombre','action'];
}
