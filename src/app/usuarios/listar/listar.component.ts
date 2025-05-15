import { Component, ElementRef, ViewChild } from '@angular/core';
import { usuario } from '../../models/usuario';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuarios.service';
import { UtilityService } from '../../services/utility.service';
import { Toast } from 'bootstrap';


@Component({
  selector: 'app-listar-usuarios',
  standalone: false,
  templateUrl:'./listar.component.html',
  styleUrl:'./listar.component.css',
})
export class ListarComponent {
  @ViewChild('modalUsuariodata') modal: ElementRef | undefined;
 
  Vectorusuarios: usuario[] = [];

  usuarioselecionado: usuario | undefined = undefined;
  isNew: boolean = false;
  isloading = true;

  constructor(private _usuarioService: UsuarioService, private _util: UtilityService){ 
    this.LoadUsuarios();
  }

  LoadUsuarios() {
    this.isloading = true;
    this._usuarioService.getusuario()
    .subscribe((rs) => {
      this.Vectorusuarios = rs;
      this.isloading = false;
    });
  }
  
  EditarUsuario(usuario: usuario) {
    this._util.AbrirModal(this.modal);
    this.isNew = false;
    this.usuarioselecionado = usuario;
  }
  nuevousuario() {
    this._util.AbrirModal(this.modal);
    this.isNew = true;
    this.usuarioselecionado = { id: 0, fechaRegistro: new Date(), nombre: '' };
  }
 
  guardarusuario() {
    if (this.isNew) {
      this.Vectorusuarios.push(this.usuarioselecionado!); 
       this.usuarioselecionado = undefined;
      this._util.cerrarModal(this.modal);
    } else {      
      this.usuarioselecionado = undefined;
      this._util.cerrarModal(this.modal);
    }
    Swal.fire({ title: 'cambio guardado correctamente', icon: 'success' });
  }
  EliminarUsuario(us: usuario) {
    Swal.fire({
      icon: 'question',
      title: `¿Esta seguro de eliminar el usuario '${us.nombre}'?`,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si, eliminar',
      allowOutsideClick: false,
      buttonsStyling: false,
      reverseButtons: true,

      customClass: {
        cancelButton: 'btn btn-secondary me-1',
        confirmButton: 'btn btn-danger',
      },
    }).then((rs) => {
      if (rs.isConfirmed) {       
        Swal.fire({
          title: 'Usuario eliminado correctamente',
          icon: 'success',
        });
      }
    });
  }
  mostrarToast(){
   this._util.showToaster('usuario guardado exitosamente', 2, 'danger');
  }
  
}
