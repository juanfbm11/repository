import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import {  RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CupedidosComponent } from './cupedidos/cupedidos.component';
import { CartComponent } from './cart/cart.component';

const ROUTES : Routes = [
  {
    path:'',
    component:ListarComponent,
  },
  {
    path:'cart',
    component:CartComponent
  }
 
];

@NgModule({
  declarations: [
    // carritoComponent,
    ListarComponent,    
    CupedidosComponent, CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule    
  ],
})
export class PedidosModule {}
