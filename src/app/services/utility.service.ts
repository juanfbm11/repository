import { ElementRef, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Modal } from 'bootstrap'; 
import { toasterModel } from '../models/core/toaster.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private toasterSubject = new Subject<toasterModel>();

  toaster$ = this.toasterSubject.asObservable();

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
  showToaster(message:string, delay:number, type:'success'| 'danger' | 'warning' | 'info' | 'primary'){

    this.toasterSubject.next({message, delay: (delay * 1000), type});
  }
}
