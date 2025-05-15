import { Component } from '@angular/core';
import { Producto } from '../../models/productos';
import { ProductosService } from '../../services/productos.service';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';

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
   
  atproducto() {
    this.router.navigate(['/productos/articulo']);
  }

  eleminar(){
    this._util.setSession('carrito' , undefined);
    this.router.navigate(['/productos/articulo']);
  }

  totales() {
    this.subtotal = 0;
    this.carrito.forEach((f) => {
      this.subtotal += f.cantidad * f.precio;
    });
    
    this.carrito.forEach((j) =>{
      this.total +=  j.precio; ///add a total otros costos aca iria el iva
    })
  }

  setCantidad($event: any, p: Producto) {
    p.cantidad = $event;
    this.totales()
  }
}
