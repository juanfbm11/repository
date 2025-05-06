import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:false,  
  templateUrl:'./header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router) {}
  
  goToListar() {
    this.router.navigate(['/usuarios']);
  }
  irlogin(){
    this.router.navigate(['/login'])
  }
  ircart(){
    this.router.navigate(['/cart'])
  }
  home(){
    this.router.navigate(['/home'])
  }
  articulo(){
    this.router.navigate(['/productos/articulo'])
  }
  reservacion(){
    this.router.navigate(['/reservas/reservacion'])
  }
}