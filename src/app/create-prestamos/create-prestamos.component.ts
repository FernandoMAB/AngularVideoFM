import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposService } from '../servicesFirebase/equipos.service';
import { PrestamoService } from '../servicesFirebase/prestamo.service';



@Component({
  selector: 'app-create-prestamos',
  templateUrl: './create-prestamos.component.html',
  styleUrls: ['./create-prestamos.component.scss']
})
export class CreatePrestamosComponent implements OnInit {

  crearPrestamo: FormGroup;
  submitted = false;
  id: string |null;
  title = '';
  description = '';
  button = '';
  equiposArray :any [] =  [];
  update = false;


  constructor(private fb: FormBuilder, private _prestamoService: PrestamoService, private router:Router, 
    private aRoute: ActivatedRoute,private _equipoService: EquiposService) { 

      this.crearPrestamo = this.fb.group({
        fechaIni: ['',Validators.required],
        fechaFin: ['',Validators.required],
        fechaEntrega: [''],
        usuario:['',Validators.required],
        estado:['',Validators.required],
        equipo:['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');

    }

  ngOnInit(): void {
    this.getEquipos();
    this.isEdit()
  }

  addUpdatePrestamo(){
    this.submitted = true;
    if(this.crearPrestamo.invalid){
      return;
    }
    if(this.id === null){
      this.addPrestamo();
    }else{
      this.updateEquipo(this.id);
    }
  }

  addPrestamo(){
    const prestamo: any = {
      fechaIni: this.crearPrestamo.value.fechaIni,
      fechaFin: this.crearPrestamo.value.fechaFin,
      fechaEntrega: this.crearPrestamo.value.fechaEntrega,
      usuario: this.crearPrestamo.value.usuario,
      estado: this.crearPrestamo.value.estado,
      equipo: this.crearPrestamo.value.equipo,
    }
    this._prestamoService.addPrestamo(prestamo).then(()=>{
      this.router.navigate(['/prestamos']);
    }).catch(error =>{
      console.error();
    })
  }

  updateEquipo(id: string){
    const prestamo: any = {
      fechaIni: this.crearPrestamo.value.fechaIni,
      fechaFin: this.crearPrestamo.value.fechaFin,
      fechaEntrega: this.crearPrestamo.value.fechaEntrega,
      usuario: this.crearPrestamo.value.usuario,
      estado: this.crearPrestamo.value.estado,
      equipo: this.crearPrestamo.value.equipo
    }
    this._prestamoService.updatePrestamo(id,prestamo).then(()=>{
      //toastr this.toastr.info('Empleado modificado')
      this.router.navigate(['/prestamos']);
    }).catch(error =>{
      console.error();
    });
  }



  isEdit(){
    if(this.id !== null){
      this.title = 'Editar Préstamo';
      this.description = 'Edite los campos del préstamo';
      this.button = 'Editar';
      this.update = true; 
      this._prestamoService.getPrestamo(this.id).subscribe(data =>{
        console.log(data.payload.data()['fechaIni'])
        var date;
        if(data.payload.data()['fechaEntrega'] ==''||data.payload.data()['fechaEntrega'] ==null){
          date = data.payload.data()['fechaEntrega'];
        }else{
          
          date = data.payload.data()['fechaEntrega'].toDate();
          console.log(date)
        }

        this.crearPrestamo.setValue({
          fechaIni: data.payload.data()['fechaIni'].toDate(),
          fechaFin: data.payload.data()['fechaFin'].toDate(),
          fechaEntrega: date,
          estado: data.payload.data()['estado'],
          usuario: data.payload.data()['usuario'],
          equipo: data.payload.data()['equipo'],
        })
      })
    }else{
      this.update = false;
      this.title = 'Nuevo Préstamo';
      this.description = 'Ingrese un nuevo préstamo';
      this.button = 'Agregar';
    }
  }

  getEquipos(){
    this._equipoService.getEquipos().subscribe(data =>{
      this.equiposArray = [];
      data.forEach((element:any) => {
        //console.log(element.payload.doc.id);//Obtener el ID
        //console.log(element.payload.doc.data())//Obtenemos toda la informacion
        this.equiposArray.push({
          id: element.payload.doc.id,
          nombre: element.payload.doc.data().nombre,
          creationDate: element.payload.doc.data().creationDate,
          modificationDate: element.payload.doc.data().modificationDate
        })
      });
    })
  }
}
