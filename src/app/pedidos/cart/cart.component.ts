import { Component } from '@angular/core';
import { Producto } from '../../models/productos';
import { ProductosService } from '../../services/productos.service';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  

  constructor(
    private _productoService: ProductosService,
    private _util: UtilityService,
    private router: Router
  ) {
    let c = this._util.getSession<Producto[]>('carrito');
    this.carrito = c ? c : [];
    this.totales();
  }

  athome(){
    this.router.navigate(['/home']);
    Swal.fire({ title: 'Se realizo pago correctamente', icon: 'success' });
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
