import { Component, ElementRef, ViewChild} from '@angular/core';
import { Reserva } from '../../models/reservas';
import Swal from 'sweetalert2';
import { Modal, Toast } from 'bootstrap';

@Component({
  selector: 'app-listar-reservas',
  standalone: false,
  templateUrl:'./listar.component.html',
  styleUrl: './listar.component.css',
})
export class ListarComponent {
  @ViewChild('modalreserva') modal : ElementRef | undefined;
  @ViewChild('liveToast') toaster: ElementRef | undefined;
  
  Vectorreservas: Reserva[] = [
    { id: 1, nombre: 'Camila', fechaReserva: new Date(), total: ' 2' },
    { id: 2, nombre: 'valeria', fechaReserva: new Date(), total: ' 4' },
  ];
  reservassselecionado: Reserva | undefined = undefined;
  isNew: boolean = false;

  Editarreserva(reservas: Reserva) {
    this.isNew = false;
    this.reservassselecionado = reservas;
  }
  nuevareserva(){
    this.isNew = true;
    this.reservassselecionado = {id:0,nombre:"",fechaReserva:new Date(),total:""};
  }
  guadarreserva(){
    if(this.isNew){
      this.Vectorreservas.push(this.reservassselecionado!);
      this.reservassselecionado = undefined;
      this.cerrarModal(this.modal);
    }else{
      this.reservassselecionado = undefined;
      this.cerrarModal(this.modal);
    }
    Swal.fire({title: 'Guardado Correctamente', icon: 'success'});
  }
  EliminarReserva(us: Reserva){
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
      if (rs.isConfirmed){
        Swal.fire({
          title:'Reserva eliminado correctamente',
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
