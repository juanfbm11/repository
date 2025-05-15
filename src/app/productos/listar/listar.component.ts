import { Component, ElementRef, ViewChild } from '@angular/core';
import { Producto } from '../../models/productos';
import Swal from 'sweetalert2';
import { Modal, Toast } from 'bootstrap';
import { ProductosService } from '../../services/productos.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-listar-productos',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
})
export class ListarComponent {
  @ViewChild('modalproducto') modal: ElementRef | undefined;
  @ViewChild('liveToast') toaster: ElementRef | undefined;

  vectorproductos: Producto[] = [];
  productoselecionado: Producto | undefined = undefined;
  isNew: boolean = false;
  isloading = true;

  constructor(
    private _productoService: ProductosService,
    private _util: UtilityService
  ) {
    this.loadProducto();
  }

  loadProducto() {
    this.isloading = true;
    this._productoService.getproducto().subscribe((rs) => {
      this.vectorproductos = rs;
      this.isloading = false;
    });
  }

  Editarproducto(producto: Producto) {
    this.isNew = false;
    this.productoselecionado = producto;
  }
  nuevoproducto() {
    this.isNew = true;
    this.productoselecionado = {
      id: 0,
      nombre: '',
      image: '',
      precio: 0,
      stock: 0,
      categoria: '',
      cantidad: 0,
    };
  }
  guardarproducto() {
    if (this.isNew) {
      this.vectorproductos.push(this.productoselecionado!);
      this.productoselecionado = undefined;
      this._util.cerrarModal(this.modal);
    } else {

      this._productoService.putproducto
      this.productoselecionado = undefined;
      this._util.cerrarModal(this.modal);
    }
    Swal.fire({ title: ' Guardado correctamente', icon: 'success' });
  }
  EliminarProducto(us: Producto) {
    Swal.fire({
      icon: 'success',
      title: `¿Quiere eliminar este producto '${us.nombre}'?`,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si, eliminarlo',
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
          title: 'Producto eliminado correctamente',
          icon: 'success',
        });
      }
    });
  }
  mostrarToast() {
    let toaster = Toast.getOrCreateInstance(this.toaster?.nativeElement);
    toaster?.show();
  }
}
