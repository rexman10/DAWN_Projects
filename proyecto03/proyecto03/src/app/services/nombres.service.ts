import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from '../interfaz/driver';
import { MRData } from '../interfaz/mrdata';

@Injectable({
  providedIn: 'root'
})
export class NombresService {
  raiz!:MRData;
  pilotos:Driver[] = [];

  constructor(private http: HttpClient) { }

  fillData(entrada:MRData){
    this.raiz = entrada;
  }

  getData(anio:string) {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let res = this.http.get('http://ergast.com/api/f1/'+anio+'/drivers.json')   
    return res
  }

  getPistas(anio:string) {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let res = this.http.get('http://ergast.com/api/f1/'+anio+'/circuits.json')   
    return res
  }

  getBandera(pais:string){
    let res = this.http.get('https://countryflagsapi.com/png/'+pais)   
    return res
  }
}

