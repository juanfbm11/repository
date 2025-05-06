import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservacion',
  standalone: false,
  templateUrl: './reservacion.component.html',
  styleUrl: './reservacion.component.css'
})
export class ReservacionComponent 
{
  constructor(private router: Router) {}
  irbookin(){
    this.router.navigate(['/'])
  }






}

