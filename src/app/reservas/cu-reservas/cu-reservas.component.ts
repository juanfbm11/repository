import { Component, Input } from '@angular/core';
import { Reserva } from '../../models/reservas';
import {format} from 'date-fns-tz';

@Component({
  selector: 'app-cu-reservas',
  standalone: false,
  templateUrl: './cu-reservas.component.html',
  styleUrl: './cu-reservas.component.css',
})
export class CuReservasComponent {
  @Input() reserva: Reserva | undefined;

  formatDateTimeLocal(fecha:Date){
    let fechaformateada = format(fecha,"yyyy-MM-dd'T'HH:mm",{timeZone:"America/Bogota"})
    return fechaformateada;
  }
  updateDate (valor:string){
    this.reserva!.fechaReserva=new Date(valor);
  }
  
}
