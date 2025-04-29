import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { ListarComponent } from './listar/listar.component';
import {  RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CupedidosComponent } from './cupedidos/cupedidos.component';

const ROUTES : Routes = [
  {
    path:'',
    component:ListarComponent,
  },
  {
    path:'carrito',
    component: CarritoComponent
  }
];

@NgModule({
  declarations: [
    CarritoComponent,
    ListarComponent,    
    CupedidosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule    
  ],
})
export class PedidosModule {}
