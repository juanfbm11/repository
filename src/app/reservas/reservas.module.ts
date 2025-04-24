import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { CuReservasComponent } from './cu-reservas/cu-reservas.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReservacionComponent } from './reservacion/reservacion.component';

const ROUTES: Routes = [
  {
    path: '',
    component: ListarComponent,
  },
  {
    path:'reservacion',
    component: ReservacionComponent
  }
];

@NgModule({
  declarations: [ListarComponent, CuReservasComponent, ReservacionComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), FormsModule],
})
export class ReservasModule {}
