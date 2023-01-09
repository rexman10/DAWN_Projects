import { Component } from '@angular/core';
import { Driver } from '../interfaz/driver';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pistas',
  templateUrl: './pistas.component.html',
  styleUrls: ['./pistas.component.css']
})
export class PistasComponent {

  pilot!:Driver;

  constructor(private route: ActivatedRoute, private router: Router) {}

}
