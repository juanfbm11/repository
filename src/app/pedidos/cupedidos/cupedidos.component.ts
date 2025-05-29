import { Component, Input } from '@angular/core';
import { Pedido } from '../../models/pedidos';
import { format } from 'date-fns-tz';

@Component({
  selector: 'app-cupedidos',
  standalone: false,
  templateUrl: './cupedidos.component.html',
  styleUrl: './cupedidos.component.css',
})
export class CupedidosComponent {
  @Input() Pedidos: Pedido | undefined;

  formatDateTimeLocal(fecha: Date) {
    let fechaformateada = format(fecha, "yyyy-MM-dd'T'HH:mm", {
      timeZone: 'America/Bogota',
    });
    return fechaformateada;
  }
  updateDate(valor: string) {  
    if(this.Pedidos){
      this.Pedidos.fechaCompra = new Date(valor);
      this.Pedidos.nombre = this.Pedidos.nombre || '';
      this.Pedidos.ciudad = this.Pedidos.ciudad || '';
      this.Pedidos.direccion = this.Pedidos.direccion || '';
      this.Pedidos.email = this.Pedidos.email || '';
      this.Pedidos.metodoPago = this.Pedidos.metodoPago || '';
      this.Pedidos.tipoEnvio = this.Pedidos.tipoEnvio || '';
      this.Pedidos.total = this.Pedidos.total || 0;
    }  
      
  

    }
    
}
