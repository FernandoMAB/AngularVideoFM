import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposService } from '../servicesFirebase/equipos.service';


@Component({
  selector: 'app-create-equipo',
  templateUrl: './create-equipo.component.html',
  styleUrls: ['./create-equipo.component.scss']
})
export class CreateEquipoComponent implements OnInit {

  crearEquipos: FormGroup;
  submitted = false;
  id: string |null;
  title = '';
  description = '';
  button = '';

  constructor(private fb: FormBuilder, private _equipoService: EquiposService, private router:Router, 
    private aRoute: ActivatedRoute) { 

      this.crearEquipos = this.fb.group({
        nombre: ['',Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  //console.log(this.id);
  }

  ngOnInit(): void {
    this.isEdit()
  }

  addUpdateEquipo(){
    this.submitted = true;
    if(this.crearEquipos.invalid){
      return;
    }
    if(this.id === null){
      this.addEquipo();
    }else{
      this.updateEquipo(this.id); 
    }
  }

  addEquipo(){
    const equipo: any = {
      nombre: this.crearEquipos.value.nombre,
      creationDate: new Date(),
      modificationDate: new Date()
    }
    this._equipoService.addEquipo(equipo).then(()=>{
      this.router.navigate(['/equipos']);
    }).catch(error =>{
      console.error();
    })
  }

  updateEquipo(id: string){
    const equipo: any = {
      nombre: this.crearEquipos.value.nombre,
      modificationDate: new Date()
    }
    this._equipoService.updateEquipo(id,equipo).then(()=>{
      //toastr this.toastr.info('Empleado modificado')
      this.router.navigate(['/equipos']);
    }).catch(error =>{
      console.error();
    });
  }


  isEdit(){
    if(this.id !== null){
      this.title = 'Editar Equipo';
      this.description = 'Edite los campos del equipo';
      this.button = 'Editar';
      this._equipoService.getEquipo(this.id).subscribe(data =>{
        this.crearEquipos.setValue({
          nombre: data.payload.data()['nombre']
        })
      })
    }else{
      this.title = 'Nuevo Equipo';
      this.description = 'Ingrese un nuevo equipo';
      this.button = 'Agregar';
    }
  }

}
