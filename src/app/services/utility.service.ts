import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modal } from 'bootstrap'; // Asegúrate de que Bootstrap esté instalado y configurado correctamente

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  login(usr:string,pwd:string): Observable<boolean>{
    return new Observable(subs => {
      let rs = usr == 'admin' && pwd == 'admin';
      subs.next(rs);
      subs.complete();
    })

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
