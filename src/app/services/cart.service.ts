import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Producto } from "../models/productos";
import { UtilityService } from "./utility.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartKey = "carrito";
  private cartItems = new BehaviorSubject<Producto[]>([]);
  cart$ = this.cartItems.asObservable();

  constructor(private util: UtilityService) {
    const savedCart = this.util.getSession<Producto[]>(this.cartKey);
    if (savedCart) {
      this.cartItems.next(savedCart);
    }
  }

  get currentCartValue(): Producto[] {
    return this.cartItems.value;
  }

  addToCart(producto: Producto) {
    const current = [...this.currentCartValue];
    const index = current.findIndex((p) => p.id === producto.id);

    if (index === -1) {
      producto.cantidad = 1;
      current.push(producto);
      this.util.showToaster(producto.nombre + " añadido", 2, "success");
    } else {
      current[index].cantidad!++;
      this.util.showToaster("Cantidad actualizada", 2, "info");
    }

    this.updateCart(current);
  }

  removeFromCart(id: number) {
    const updated = this.currentCartValue.filter((p) => p.id !== id);
    this.updateCart(updated);
  }

  clearCart() {
    this.updateCart([]);
  }

  private updateCart(items: Producto[]) {
    this.cartItems.next(items);
    this.util.setSession(this.cartKey, items);
  }
}
