import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { RouterModule, Routes } from '@angular/router';
import { CuProductosComponent } from './cu-productos/cu-productos.component';
import { FormsModule } from '@angular/forms';

const ROUTES: Routes = [
  {
    path: '',
    component: ListarComponent,
  },
];

@NgModule({
  declarations: [ListarComponent, CuProductosComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), FormsModule],
})
export class ProductosModule {}
