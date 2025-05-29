import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../../models/usuario';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  usuario: string = '';

  constructor(private router: Router, private util: UtilityService) {
    let u = util.getCurrentUser();
    if (u) this.usuario = u!.nombre;
    else this.router.navigate(['/login']);
  }

  goToListar() {
    this.router.navigate(['/usuarios']);
  }
  irlogin() {
    this.router.navigate(['/login']);
  }
  ircart() {
    this.router.navigate(['/cart']);
  }
  home() {
    this.router.navigate(['/home']);
  }
  articulo() {
    this.router.navigate(['/productos/articulo']);
  }
  reservacion() {
    this.router.navigate(['/reservas/reservacion']);
  }
}
