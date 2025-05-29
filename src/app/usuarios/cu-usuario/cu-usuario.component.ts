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
   
  updateDate(valor: string) {
  if (this.usuario) {
    this.usuario.fechaRegistro = new Date(valor);
    this.usuario.contrasena = this.usuario.contrasena|| ''; 
    this.usuario.correo = this.usuario.correo|| ''; 
    this.usuario.nombreUsuario = this.usuario.nombreUsuario || ''; 
  }
}
}
