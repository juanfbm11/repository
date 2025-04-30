import { Component, Input } from '@angular/core';
import { Pedidos } from '../../models/pedidos';
import { format } from 'date-fns-tz';

@Component({
  selector: 'app-cupedidos',
  standalone: false,
  templateUrl: './cupedidos.component.html',
  styleUrl: './cupedidos.component.css',
})
export class CupedidosComponent {
  @Input() Pedidos: Pedidos | undefined;

  formatDateTimeLocal(fecha: Date) {
    let fechaformateada = format(fecha, "yyyy-MM-dd'T'HH:mm", {
      timeZone: 'America/Bogota',
    });
    return fechaformateada;
  }
  updateDate(valor: string) {
    this.Pedidos!.fechaCompra = new Date(valor);
  }
}
