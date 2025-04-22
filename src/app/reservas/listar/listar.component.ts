import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { Reserva } from '../../models/reservas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-reservas',
  standalone: false,
  templateUrl:'./listar.component.html',
  styleUrl: './listar.component.css',
})
export class ListarComponent {
  @ViewChild('modalreserva') modal : ElementRef | undefined;
  Vectorreservas: Reserva[] = [
    { id: 1, nombre: 'cliente 1', fechaReserva: new Date(), total: 'numero 2' },
    { id: 2, nombre: 'cliente 2', fechaReserva: new Date(), total: 'numero 4' },
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
    Swal.fire({title: 'Cambios Correctamente', icon: 'success'});
  }
  EliminarReserva(us: Reserva){
    Swal.fire({
      icon:'question',
      title: `Esta seguro de eliminar reserva '${us.nombre}'?`,
      showCancelButton:true,
      showConfirmButton:true,
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
  cerrarModal(modal : ElementRef | undefined){
    if(modal){
      let btsModal = modal?.nativeElement.getInstace(modal?.nativeElement);
      btsModal?.hide();
      let backdrop = document.querySelector('.modal.-backdrop.fade.show');
      if (backdrop){
        backdrop.parentNode?.removeChild(backdrop);
      }
      document.body.removeAttribute('style');
      document.body.removeAttribute('class');
    }
  }
}
