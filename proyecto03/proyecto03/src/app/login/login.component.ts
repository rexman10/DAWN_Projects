import { Component, OnInit } from '@angular/core';
import { NombresService } from '../services/nombres.service';
import { Router } from '@angular/router';
import { PilotosComponent } from '../pilotos/pilotos.component';
import { MRData } from '../interfaz/mrdata';
import { RootObject } from '../interfaz/root-object';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  yearSelection:string = ''

  constructor(private resourcesService: NombresService, private router: Router) {
    localStorage.clear()
    console.log(document.getElementsByClassName("form-control"));
  }
  ngOnInit(): void {
    //console.log("prueba de orden ngOnInit");
    this.generarNumero();
  }

  getValue(val:string){
    this.yearSelection = val;
  }

  generarNumero(){
    let boton = document.getElementsByClassName("btn")[0];
    boton.addEventListener('click', () => {
      console.log("El año escogido es " + this.yearSelection);
      document.getElementsByName('continuar')[0].removeAttribute('disabled')

      this.resourcesService.getData(this.yearSelection).subscribe(response => {
        localStorage.setItem("anioActual",this.yearSelection);
        console.log("res de login component",response);
        document.getElementsByName('continuar')[0]['attributes']
        localStorage.setItem("dataF1", JSON.stringify(response));
        //console.log("dataf1",dataF1);
                                     
      });               
    });
  }


}
