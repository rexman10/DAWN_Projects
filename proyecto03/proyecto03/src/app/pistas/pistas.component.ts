import { Component } from '@angular/core';
import { Driver } from '../interfaz/driver';
import { Router } from '@angular/router';
import { Circuit } from '../interfaz/circuit';
import { NombresService } from '../services/nombres.service';

@Component({
  selector: 'app-pistas',
  templateUrl: './pistas.component.html',
  styleUrls: ['./pistas.component.css']
})
export class PistasComponent {

  pilot!:Driver;
  circuitos:Circuit[] = [];

  constructor(private resourceService:NombresService, private router: Router) {
    let codePiloto = localStorage.getItem("pilotoActual")!;
    console.log(codePiloto);
    


    let dataTemp = JSON.parse(localStorage.getItem("dataF1")!);
    if (dataTemp){
      let arreglo = dataTemp["MRData"]["DriverTable"]["Drivers"]
      for (let index = 0; index < arreglo.length; index++) {
        const elemento = arreglo[index];
        if(elemento.driverId == codePiloto){
          this.pilot = elemento
          
        }
      }
    }

    let nombresCircuitos = JSON.parse(localStorage.getItem("circuitosF1")!);
    
    if(nombresCircuitos) {
      let tabla = nombresCircuitos["MRData"]["CircuitTable"]["Circuits"];
      this.circuitos = tabla as Circuit[]
    } 
  }

  getStats(circuito:string){
      localStorage.setItem('circuitId', circuito)
      setTimeout(() => {
        this.router.navigate(['stats']);
      }, 100);
  }

}
