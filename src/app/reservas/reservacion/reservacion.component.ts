import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Reserva } from '../../models/reservas';
import { UtilityService } from '../../services/utility.service';
import { ReservaService } from '../../services/reserva.service';
import { Modal } from 'bootstrap';
import { format } from 'date-fns-tz';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reservacion',
  standalone: false,
  templateUrl: './reservacion.component.html',
  styleUrl: './reservacion.component.css'
})
export class ReservacionComponent {
   @ViewChild('reservas') modal: ElementRef | undefined;

  Vectorreservas: Reserva[] = [ ];
  
   formatDateTimeLocal(fecha:Date){
      let  fechaformateada = format(fecha,"yyyy-MM-dd'T'HH:mm",{timeZone:"America/Bogota"})
      return fechaformateada;
    } 

  reservassselecionado: Reserva = {id:0, nombre: ' ', fechaReserva: new Date, total:0}
  isNew: boolean = false;
  isloading = true;


  constructor(private router: Router, 
    private _util: UtilityService,
    private _Reservaservice: ReservaService, 

  ) {}

  loadReserva(){
    this.isloading = true;
    this._Reservaservice.getreserva()
    .subscribe((rs) =>{
      this.Vectorreservas = rs;
      this.isloading = false;
    });
  }
  
irbookin(reservaForm: NgForm) {
  if (reservaForm.valid) {
    this.isNew = true; 
    if (this.isNew) {
      this._Reservaservice.postreserva(this.reservassselecionado)
        .subscribe(() => {          
          Swal.fire({ title: 'Reserva guardada correctamente', icon: 'success' });          
          this.reservassselecionado = { id: 0, nombre: '', fechaReserva: new Date(), total: 0 };         
          window.location.reload();         
        }, error => {
          console.error('Error al guardar la reserva:', error);
          Swal.fire({ title: 'Error al guardar', text: 'Por favor intenta nuevamente', icon: 'error' });
        });    }
  } else {
    Swal.fire({ title: 'Formulario inválido', text: 'Por favor completa todos los campos requeridos.', icon: 'warning' });
  }
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

