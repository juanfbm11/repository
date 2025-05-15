import { Component } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/productos';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-articulo',
  standalone: false,
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css',
})
export class ArticuloComponent {
  carrito: Producto[] = [];

  perros: Producto[] = [];
  hamburguesas: Producto[] = [];
  bebidas: Producto[] = [];

  isloading = true;

  constructor(
    private _productoService: ProductosService,
    private _util: UtilityService
  ) {
    this.loadProducto();
    let c = this._util.getSession<Producto[]>('carrito');
    this.carrito = c ? c : [];
  }

  loadProducto() {
    this.isloading = true;
    this._productoService.getproducto().subscribe((rs) => {
      this.bebidas = rs.filter((d) => d.categoria == 'Bebida');
      this.hamburguesas = rs.filter((d) => d.categoria == 'Hamburguesa');
      this.perros = rs.filter((d) => d.categoria == 'Perro');
      this.isloading = false;
    });
  }

  addCart(p: Producto) {
    if (!this.carrito.some((f) => f.id == p.id)) {
      p.cantidad = 1;
      this.carrito.push(p);
      this._util.showToaster(p.nombre + ' Añadido al carrito', 0, 'success');
    } else {
      this._util.showToaster(p.nombre + ' Esta en el carrito', 0, 'success');
    }
    this._util.setSession('carrito', this.carrito);
  }
}
