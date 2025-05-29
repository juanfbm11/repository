import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Pedido } from '../../models/pedidos';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { PedidosService } from '../../services/pedidos.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-listar',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
})
export class ListarComponent implements OnInit {
  pedidos: Pedido[] = [];
  @ViewChild('Modalpedido') modal: ElementRef | undefined;
  @ViewChild('liveToast') toaster: ElementRef | undefined;

  VectorPedidos: Pedido[] = [];

  PedidoSeleccionado: Pedido | undefined = undefined;
  isNew: boolean = false;
  isloading = true;

  constructor(
    private _pedidoService: PedidosService,
    private _util: UtilityService
  ) {
    let p = this._util.getSession<Pedido[]>('pedidos');
    this.pedidos = p ? p : [];
  }

  ngOnInit() {
    this.LoadPedidos();
  }

  LoadPedidos() {
    this.isloading = true;
    this._pedidoService.getpedido()
    .subscribe((rs) => {
      this.VectorPedidos = rs;
      this.isloading = false;
    });
  }

  editarPedido(pedidos: Pedido) {
    this._util.AbrirModal(this.modal);
    this.isNew = false;
    this.PedidoSeleccionado = pedidos;
  }

  nuevoPedido() {
    this._util.AbrirModal(this.modal);
    this.isNew = true;
    this.PedidoSeleccionado = {
      id: 0,
      nombre: "",
      fechaCompra: new Date(),
      total: 0,
      email: "",
      ciudad: "",
      direccion: "",
      tipoEnvio: "",
      metodoPago: "",
      productos: [],
    };
    this._util.AbrirModal(this.modal);
  }

  guardarPedido() {
    if (this.isNew) {
      this._pedidoService
      .postpedido(this.PedidoSeleccionado!)
      .subscribe(() => {
        this.LoadPedidos();
        this.PedidoSeleccionado = undefined;
        this._util.cerrarModal(this.modal);
        Swal.fire({ title: 'pedido guardado', icon: 'success' });
      });
    } else{
      this._pedidoService.putpedido(this.PedidoSeleccionado!)
      .subscribe(() => {
        this.LoadPedidos();
        this.PedidoSeleccionado = undefined;
        this._util.cerrarModal(this.modal);
        Swal.fire({
          title: 'Actualizado correctamente',
          icon: 'success'});        
      });
    }  
  }

  eliminarPedido(p: Pedido) {
    Swal.fire({
      icon: 'question',
      title: `Esta seguro de eliminar la reserva '${p.nombre}'?`,
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
    }).then((rs) => {
      if (rs.isConfirmed) {
        this._pedidoService.deletepedido(p.id).subscribe(() => {
          this.LoadPedidos();
          this.PedidoSeleccionado = undefined;
          this._util.cerrarModal(this.modal);
        });
        Swal.fire({
          title: 'Pedido eliminado correctamente',
          icon: 'success',
        });
      }
    });
  }

  mostrarToast() {
    this._util.showToaster('Pedido guardado exitosamente', 2, 'danger');
  }

  cerrarModal(modal: ElementRef | undefined) {
    if (modal) {
      let btsModal = Modal.getInstance(modal.nativeElement);
      btsModal?.hide();
      let backdrop = document.querySelector('.modal-backdrop.fade.show');
      if (backdrop) {
        backdrop.parentNode?.removeChild(backdrop);
      }
      document.body.removeAttribute('style');
      document.body.removeAttribute('class');
    }
  }
}
