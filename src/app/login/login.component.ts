import { Component } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usr: string = '';
  pwd: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  constructor(private _utilService: UtilityService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  login() {
    this._utilService.login(this.usr, this.pwd).subscribe((rs) => {
      if (rs) {
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          title: 'usuario y/o contraseña incorrectos',
          icon: 'error',
        });
      }
    });
  }
}
