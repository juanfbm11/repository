import { Component, Input } from '@angular/core';
import { usuario } from '../../models/usuario';
import {format} from 'date-fns-tz';

@Component({
  selector: 'app-cu-usuario',  
  standalone: false,
  templateUrl:'./cu-usuario.component.html',
  styleUrl: './cu-usuario.component.css',
})
export class CuUsuarioComponent {
  @Input() usuario: usuario | undefined;

  formatDateTimeLocal(fecha:Date){
    let  fechaformateada = format(fecha,"yyyy-MM-dd'T'HH:mm",{timeZone:"America/Bogota"})
    return fechaformateada;
  }
  updateDate(valor:string){
    this.usuario!.fechaRegistro = new Date(valor);
  }
}
