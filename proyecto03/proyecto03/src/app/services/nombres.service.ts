import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NombresService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://ergast.com/api/f1/drivers?=2022')
  }
}
