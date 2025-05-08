import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../../models/usuario';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-header',
  standalone:false,  
  templateUrl:'./header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currenUsuario:  usuario | undefined;

  constructor(private router: Router, private util: UtilityService) {
    if(util.isloggedIn())
    this.currenUsuario= this.util.getCurrentUser();
    else
    this.router.navigate(['/login'])
  }
  
  
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