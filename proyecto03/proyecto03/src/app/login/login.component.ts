import { Component, OnInit } from '@angular/core';
import { NombresService } from '../services/nombres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  yearSelection:number


  constructor(private resourcesService: NombresService, private router: Router) {
    this.yearSelection = Number.parseInt('55');
    this.generarNumero();
    console.log(document.getElementsByClassName("form-control"));
    
    
  }
  ngOnInit(): void {
    this.generarNumero();
  }

  getValue(val:string){
    this.yearSelection = Number.parseInt(val);
    
  }

  generarNumero(){
    let boton = document.getElementsByClassName("btn")[0];;
    boton?.addEventListener('click', () => {
      console.log("El año escogido es " + this.yearSelection);
      
      
    });
  }


}
