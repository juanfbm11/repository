import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector:'app-root',
  templateUrl:'./app.component.html',
  standalone: false,
  styleUrl:'./app.component.css',
})
export class AppComponent {
  constructor (private router:Router){

  }
  isloginRoute():boolean{
    return this.router.url ==='/login';
  }
  title = 'PerritosCallejeros';
}
