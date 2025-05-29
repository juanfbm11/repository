import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Reserva } from '../../models/reservas';
import Swal from 'sweetalert2';
import { Modal, Toast } from 'bootstrap';
import { ReservaService } from '../../services/reserva.service';
import { UtilityService } from '../../services/utility.service';


@Component({
  selector: 'app-listar-reservas',
  standalone: false,
  templateUrl:'./listar.component.html',
  styleUrl: './listar.component.css',
})
export class ListarComponent implements OnInit {
  reservas: Reserva[]=[];
  @ViewChild('modalreserva') modal : ElementRef | undefined;
  @ViewChild('liveToast') toaster: ElementRef | undefined;
  
  Vectorreservas: Reserva[] = [ ];

  reservassselecionado: Reserva | undefined = undefined;
  isNew: boolean = false;
  isloading = true;

  constructor (private _Reservaservice: 
    ReservaService, 
    private _util: UtilityService)
  {
    let r = this._util.getSession<Reserva[]>('reservas');
    this.reservas = r ? r : [];
  }
  
  ngOnInit() {
      this.loadReserva();
  }

  loadReserva(){
    this.isloading = true;
    this._Reservaservice.getreserva()
    .subscribe((rs) =>{
      this.Vectorreservas = rs;
      this.isloading = false;
    });
  }

  Editarreserva(reservas: Reserva) {
    this._util.AbrirModal(this.modal);
    this.isNew = false;
    this.reservassselecionado = reservas;
  }

  nuevareserva(){
    this._util.AbrirModal(this.modal);
    this.isNew = true;
    this.reservassselecionado = {
      id:0,
      nombre:"",
      fechaReserva:new Date(),
      total:0
    };
      this._util.AbrirModal(this.modal);
  }


  guadarreserva(){
    if(this.isNew){
      this._Reservaservice
      .postreserva(this.reservassselecionado!)
      .subscribe(() =>{
        this.loadReserva();
        this.reservassselecionado = undefined;
      this.cerrarModal(this.modal);
      this._util.cerrarModal(this.modal);
      Swal.fire({title:'Reserva guardada correctamente', icon:'success'});
      });      
    }else{
      this._Reservaservice.putreserva(this.reservassselecionado!)
      .subscribe(() =>{
        this.loadReserva();
        this.reservassselecionado = undefined;
        this._util.cerrarModal(this.modal);
        Swal.fire({title:'Reserva actualizada', icon:'success'})
      });      
    }    
  }

  EliminarReserva(r: Reserva){
    Swal.fire({
      icon:'question',
      title: `Esta seguro de eliminar la reserva '${r.nombre}'?`,
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
    this._util.showToaster('Reserva guardad correctamente',2,'danger');
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
