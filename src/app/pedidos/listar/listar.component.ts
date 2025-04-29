import { Component, ElementRef, ViewChild } from '@angular/core';
import { Pedidos } from '../../models/pedidos';
import Swal from 'sweetalert2';
import { Modal, Toast } from 'bootstrap';


@Component({
  selector: 'app-listar',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  @ViewChild ('modalpedido') modal : ElementRef | undefined;
  @ViewChild ('liveToast') toaster : ElementRef | undefined;

  VectorPedidos : Pedidos[]=[
    { id : 1, nombre: 'cliente 1', fechaCompra: new Date(), total:'numero 2'},
    { id : 2, nombre: 'cliente 2', fechaCompra: new Date(), total:'numero 4'},
  ];
   PedidoSeleccionado: Pedidos | undefined = undefined;
    isNew: boolean = false;

  editarPedido( pedidos: Pedidos){
    this.isNew = false;
    this.PedidoSeleccionado = pedidos;
  }
  
  nuevoPedido(){
    this.isNew=true;
    this.PedidoSeleccionado = {id:0,nombre:" ",fechaCompra:new Date(),total:" "};
  }
  
  guardarPedido(){
    if(this.isNew){
      this.VectorPedidos.push(this.PedidoSeleccionado!);
      this.PedidoSeleccionado = undefined;
      this.cerrarModal(this.modal);      
    }else{
      this.PedidoSeleccionado = undefined;
      this.cerrarModal(this.modal)
    }
    Swal.fire({title: 'Guardado Corractamente', icon: 'success'})
  }
 eliminarPedido(us: Pedidos){
  Swal.fire({
    icon:'question',
      title: `Esta seguro de eliminar la reserva '${us.nombre}'?`,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si, Eliminar reserva',
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
        title:'Pedido eliminado correctamente',
          icon: 'success'
      });
    }
  });
}

 mostrarToast(){
  let toaster = Toast.getOrCreateInstance(this.toaster?.nativeElement);
  toaster?.show();
 }

 cerrarModal(modal : ElementRef | undefined){
   if(modal){
        let btsModal = Modal.getInstance(modal.nativeElement);
        btsModal?.hide();
        let backdrop = document.querySelector('.modal-backdrop.fade.show');
        if (backdrop){
          backdrop.parentNode?.removeChild(backdrop);
        }
        document.body.removeAttribute('style');
        document.body.removeAttribute('class');
      }
 }

}
