import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { CuReservasComponent } from './cu-reservas/cu-reservas.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const ROUTES: Routes = [
  {
    path: '',
    component: ListarComponent,
  },
];

@NgModule({
  declarations: [ListarComponent, CuReservasComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), FormsModule],
})
export class ReservasModule {}
