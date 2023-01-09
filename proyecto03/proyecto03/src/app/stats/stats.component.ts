import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Circuit } from '../interfaz/circuit';
import { Result } from '../interfaz/results';
import { NombresService } from '../services/nombres.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  anioString!:string
  driverString!:string
  codeCircuit!:string
  circuito!:Circuit
  resultado!:Result

  constructor(private resourcesService: NombresService, private router: Router) {

    let datoAnio = localStorage.getItem("anioActual");
    if(datoAnio){
      this.anioString = datoAnio
    }

    let datoDriver = localStorage.getItem("pilotoActual");
    if(datoDriver){
      this.driverString = datoDriver
    }
    
    let dataCircuit = localStorage.getItem("circuitId");
    if (dataCircuit){
      this.codeCircuit = dataCircuit
    }


    let dataObj = JSON.parse(localStorage.getItem("circuitosF1")!)
    if (dataObj){
      let circuitos = dataObj['MRData']["CircuitTable"]["Circuits"]
      for (let index = 0; index < circuitos.length; index++) {
        const element = circuitos[index];
        if (element["circuitId"] == this.codeCircuit){
          this.circuito = element
        }
      }

      let arreglo = JSON.parse(localStorage.getItem("standings")!);
      if(arreglo){
        let info = arreglo["MRData"]["RaceTable"]["Races"]
        for (let index = 0; index < info.length; index++) {
          const element = info[index];
          if (element["Circuit"]["circuitId"] == this.codeCircuit){
            console.log(element);
            localStorage.setItem("results",JSON.stringify(element["Results"][0]))
            this.resultado = element["Results"][0];
          }
        }
      }
      
    }
  }

  ngOnInit(){
    this.getEstadisticas()
  }

  getEstadisticas(){
    this.resourcesService.getStandings(this.anioString,this.driverString).subscribe(response => {
      localStorage.setItem("standings", JSON.stringify(response));
      //console.log("dataf1",dataF1);
    });
  }
  

  

}
