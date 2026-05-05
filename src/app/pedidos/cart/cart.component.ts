import { Component } from '@angular/core';
import { Producto } from '../../models/productos';
import { Pedido } from '../../models/pedidos';
import { ProductosService } from '../../services/productos.service';
import { PedidosService } from '../../services/pedidos.service';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  carrito: Producto[] = [];
  subtotal = 0;
  total = 0;
  isloading = true;
  
   // Propiedades para el formulario
  email: string = '';
  nombreCompleto: string = '';
  ciudad: string = '';
  direccion: string = '';
  tipoEnvio: string = 'gratis'; // por defecto
  metodoPago: string = '';
  numeroTarjeta: string = '';
  fechaTarjeta: string = '';
  cvc: string = '';

  constructor(
    private _productoService: ProductosService,
    private _pedidosService: PedidosService,
    private _util: UtilityService,
    private router: Router
  ) {
    let c = this._util.getSession<Producto[]>('carrito');
    this.carrito = c ? c : [];
    this.totales();
  }


athome(pedidoForm: NgForm) {
    if (pedidoForm.valid) {
        const nuevoPedido = {
            id: 0,
            fechaCompra: new Date(),
            email: this.email,
            nombre: this.nombreCompleto,
            ciudad: this.ciudad,
            direccion: this.direccion,
            tipoEnvio: this.tipoEnvio,
            metodoPago: this.metodoPago,
            numeroTarjeta: this.numeroTarjeta,
            fechaTarjeta: this.fechaTarjeta,
            cvc: this.cvc,
            total: this.total,
            productos: this.carrito,
        } as Pedido;
        this._pedidosService.postpedido(nuevoPedido).subscribe({
            next: (_pedido: any) => {
                Swal.fire({ title: 'Se realizó el pago correctamente', icon: 'success' });
                this.router.navigate(['/home']);
            },
            error: () => {
                Swal.fire({ title: 'Error al realizar el pago', icon: 'error' });
            },
        });
    } else {
        Swal.fire({ title: 'Formulario inválido', text: 'Por favor completa todos los campos requeridos.', icon: 'warning' });
    }
}

   
  atproducto() {
    this.router.navigate(['/productos/articulo']);
  }

  eliminarCarrito() {
    this.carrito = [];
    this._util.setSession('carrito', undefined);
    this.totales();
    this.router.navigate(['/productos/articulo']);
    Swal.fire({ title: 'Productos eliminados correctamente', icon: 'success' });
  }

  eliminarProducto(producto: Producto) {
    this.carrito = this.carrito.filter((item) => item.id !== producto.id);
    this._util.setSession('carrito', this.carrito.length ? this.carrito : undefined);
    this.totales();
  }

  totales() {
    this.subtotal = 0;
    this.total = 0;
    this.carrito.forEach((f) => {
      this.subtotal += f.cantidad * f.precio;
      this.total += f.cantidad * f.precio;
    });
  }

  setCantidad($event: any, p: Producto) {
    p.cantidad = Number($event);
    this._util.setSession('carrito', this.carrito);
    this.totales();
  }
}
