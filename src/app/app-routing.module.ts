import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './pedidos/carrito/carrito.component';

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
    path:'',
    component: HomeComponent
  },
  {
    path:'carrito',
    component: CarritoComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
