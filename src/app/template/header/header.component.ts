import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:false,  
  templateUrl: './header.component.html',
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
  ircarrito(){
    this.router.navigate(['/carrito'])
  }
}
