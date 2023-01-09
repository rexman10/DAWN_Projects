import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  pilotCodeSelection:string = '';

  constructor(private resourceService:NombresService, private router: Router){
    //console.log("entro a pilotos");

    let nombresPilotos = JSON.parse(localStorage.getItem("dataF1")!);

    //console.log("nombresPilotos del componente ", nombresPilotos);
    
    if(nombresPilotos) {
      let tabla = nombresPilotos["MRData"]["DriverTable"]["Drivers"];
      this.pilotos = tabla as Driver[]
    } 

    let anio = localStorage.getItem('anioActual');

    if(anio){
      this.yearSelection = anio;
    }

    //console.log("esto es el atributo pilotos", this.pilotos);
    
  }

  getPistas(){
    this.resourceService.getPistas(this.yearSelection).subscribe(response => {
      localStorage.setItem("circuitosF1", JSON.stringify(response));
      //console.log("dataf1",dataF1);
    });
    setTimeout(() => {
      this.router.navigate(['pistas']);
    }, 100);
  }


  ngAfterViewChecked() {
    let botones = document.getElementsByName("btnCircuitos")
    //console.log(botones);
    for (let index = 0; index < botones.length; index++) {
      const element = botones[index];
      //console.log(element);
      
      element.addEventListener('click', () => {
        this.pilotCodeSelection = element.id.split("-")[1]
      })
      
    }
    localStorage.setItem("pilotoActual",this.pilotCodeSelection);
    
  }



}
