import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({ title: 'Reserva guardada correctamente', icon: 'success' });
  }






}

