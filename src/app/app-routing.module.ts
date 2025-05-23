import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './pedidos/cart/cart.component';


const routes: Routes = [
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./productos/productos.module').then(m => m.ProductosModule),
  },
  {
    path: 'reservas',
    loadChildren: () =>
      import('./reservas/reservas.module').then(m => m.ReservasModule),
  },  
  {
    path: 'pedidos',
    loadChildren:()=>
      import('./pedidos/pedidos.module').then(m => m.PedidosModule),    
  },
  
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'cart',
    component:CartComponent
  },

 {
    path:'**',
    component:HomeComponent
  }
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
