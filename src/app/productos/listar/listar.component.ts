import { Component, ElementRef, ViewChild } from '@angular/core';
import { Producto } from '../../models/productos';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-listar-productos',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
})
export class ListarComponent {
 @ViewChild('modalproducto') modal : ElementRef | undefined;
  vectorproductos: Producto[] = [
    { id: 1, nombre: 'producto 1', precio: 1000, stock: 4 },
    { id: 12, nombre: 'producto 1', precio: 2000, stock: 5 },
  ];
  productoselecionado: Producto | undefined = undefined;
  isNew : boolean = false;

  Editarproducto(producto: Producto) {
    this.isNew = false;
    this.productoselecionado = producto;
  }
  nuevoproducto(){
    this.isNew = true;
    this.productoselecionado = {id:0,nombre:"",precio:0,stock:0}
  }
  guardarproducto(){
    if (this.isNew) {
      this.vectorproductos.push(this.productoselecionado!);
      this.productoselecionado = undefined;
      this.cerrarModal(this.modal);
    } else {
      this.productoselecionado = undefined;
      this.cerrarModal(this.modal);
    }
    Swal.fire({title:' Guardado correctamente', icon:'success'});
  }
  EliminarProducto(us: Producto){
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
    }).then((rs)=>{
      if(rs.isConfirmed){
        Swal.fire({
          title:'Producto eliminado correctamente',
          icon:'success',
        });
      }
    });
  }
  cerrarModal(modal : ElementRef | undefined){
    if(modal ){
      let btsModal = Modal.getInstance(modal.nativeElement);
      btsModal?.hide();
      let backdrop = document.querySelector('.modal-backdrop.fade.show');
      if(backdrop){
        backdrop.parentNode?.removeChild(backdrop);
      }
      document.body.removeAttribute('style');
      document.body.removeAttribute('class');
    }
  }

  }

