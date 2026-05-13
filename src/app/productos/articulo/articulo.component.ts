import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../../services/productos.service";
import { Producto } from "../../models/productos";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-articulo",
  standalone: false,
  templateUrl: "./articulo.component.html",
  styleUrl: "./articulo.component.css",
})
export class ArticuloComponent implements OnInit {
  perros: Producto[] = [];
  hamburguesas: Producto[] = [];
  bebidas: Producto[] = [];
  isloading = true;

  constructor(
    private _productoService: ProductosService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this.loadProducto();
  }

  loadProducto() {
    this.isloading = true;
    this._productoService.getproducto().subscribe({
      next: (rs) => {
        this.bebidas = rs.filter((d) => d.categoria === "Bebida");
        this.hamburguesas = rs.filter((d) => d.categoria === "Hamburguesa");
        this.perros = rs.filter((d) => d.categoria === "Perro");
        this.isloading = false;
      },
      error: (err) => {
        console.error("Error cargando productos", err);
        this.isloading = false;
      }
    });
  }

  addCart(p: Producto) {
    this._cartService.addToCart(p);
  }
}
