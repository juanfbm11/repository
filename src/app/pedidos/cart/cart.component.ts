import { Component } from '@angular/core';
import { Producto } from '../../models/productos';
import { ProductosService } from '../../services/productos.service';
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
  private _pedidosService: any;
  

  constructor(
    private _productoService: ProductosService,
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
            email: this.email,
            nombreCompleto: this.nombreCompleto,
            ciudad: this.ciudad,
            direccion: this.direccion,
            tipoEnvio: this.tipoEnvio,
            metodoPago: this.metodoPago,
            numeroTarjeta: this.numeroTarjeta,
            fechaTarjeta: this.fechaTarjeta,
            cvc: this.cvc,
            productos: this.carrito,
        };
        this._pedidosService.createPedido(nuevoPedido).subscribe({
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

  eleminar(){
    this._util.setSession('carrito' , undefined);
    this.router.navigate(['/productos/articulo']);
    Swal.fire({ title: 'productos eliminados correctamente', icon: 'success' });
  }

  totales() {
    this.subtotal = 0;
    this.carrito.forEach((f) => {
      this.subtotal += f.cantidad * f.precio;
    });    
    this.carrito.forEach((j) =>{
      this.total +=  j.precio; 
    })
  }

  setCantidad($event: any, p: Producto) {
    p.cantidad = $event;
    this.totales()
  }
}
