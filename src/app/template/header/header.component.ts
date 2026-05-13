import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { usuario } from "../../models/usuario";
import { UtilityService } from "../../services/utility.service";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-header",
  standalone: false,
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
  usuario: string = "";
  isAdmin: boolean = false;
  roleName: string = "";
  cartCount: number = 0;

  constructor(
    private router: Router, 
    private util: UtilityService,
    private cartService: CartService
  ) {
    let u = util.getCurrentUser();
    if (u) {
      this.usuario = u!.nombre;
      this.isAdmin = util.isAdmin();
      this.roleName = u.rol === "admin" ? "Administrador" : "Cliente";
    }
  }

  ngOnInit() {
    // Escucha cambios en el carrito en tiempo real
    this.cartService.cart$.subscribe(items => {
      this.cartCount = items.length;
    });
  }

  logout() {
    this.util.logout();
    this.cartService.clearCart();
    this.usuario = "";
    this.isAdmin = false;
    this.roleName = "";
    this.router.navigate(["/home"]).then(() => {
      window.location.reload();
    });
  }

  goToListar() { this.router.navigate(["/usuarios"]); }
  irlogin() { this.router.navigate(["/login"]); }
  ircart() { this.router.navigate(["/cart"]); }
  home() { this.router.navigate(["/home"]); }
  articulo() { this.router.navigate(["/productos/articulo"]); }
  reservacion() { this.router.navigate(["/reservas/reservacion"]); }
  irAdmin() { this.router.navigate(["/admin"]); }
}
