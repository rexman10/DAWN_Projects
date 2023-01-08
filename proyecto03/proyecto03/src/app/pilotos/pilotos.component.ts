import { Component, OnInit } from '@angular/core';
import { Driver } from '../interfaz/driver';
import { NombresService } from '../services/nombres.service';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.css']
})
export class PilotosComponent {

  pilotos?:Driver[];
  yearSelection:string = '';

  constructor(private resourceService:NombresService){
    console.log("entro a pilotos");

    let nombresPilotos = JSON.parse(localStorage.getItem("dataF1")!);

    console.log("nombresPilotos del componente ", nombresPilotos);
    
    if(nombresPilotos) {
      let tabla = nombresPilotos["MRData"]["DriverTable"]["Drivers"];
      this.pilotos = tabla as Driver[]
    } 

    let anio = localStorage.getItem('anioActual');

    if(anio){
      this.yearSelection = anio;
    }

    console.log("esto es el atributo pilotos", this.pilotos);

  }

  ngOnInit(): void {
    console.log("Segunda prueba ngoninit");
  }



}
