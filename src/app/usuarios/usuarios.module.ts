import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { RouterModule, Routes } from '@angular/router';
import { CuUsuarioComponent } from './cu-usuario/cu-usuario.component';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuarios.service';


const ROUTES: Routes = [
  {
    path: '',
    component: ListarComponent,
  },
];

@NgModule({
  declarations: [
    ListarComponent ,
    CuUsuarioComponent
  ],
  
  imports: [
    CommonModule, 
    RouterModule.forChild(ROUTES), 
    FormsModule],
 
})
export class UsuariosModule {}
