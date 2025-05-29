import { ElementRef, Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { Modal } from 'bootstrap';
import { toasterModel } from '../models/core/toaster.model';
import { usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private urlApiBase = '';
  private toasterSubject = new Subject<toasterModel>();
  private sessionKey = 'UsuarioSession ';

  toaster$ = this.toasterSubject.asObservable();

  constructor(private http: HttpClient) {
    this.urlApiBase = environment.urlApiBase;
  }

  login(nombreUsuario: string, contrasena: string): Observable<boolean> {
    return this.http
      .post<boolean>(this.urlApiBase + 'usuario/login', {
        nombreUsuario,
        contrasena,
      })
      .pipe(
        tap((rs) => {
          this.setSession(this.sessionKey, rs);
        }),
        map(() => true),
        catchError((error) => {
          return of(false);
        })
      );
  }

  getCurrentUser(): usuario | undefined {
    return this.getSession<usuario>(this.sessionKey);
  }

  logout() {
    this.setSession(this.sessionKey, undefined);
  }

  isloggedIn(): boolean {
    let usr = this.getSession(this.sessionKey);
    return usr != undefined;
  }

  getSession<T>(key: string) {
    let obj = localStorage.getItem(btoa(key));
    if (obj) return JSON.parse(atob(obj)) as T;
    else return undefined;
  }

  setSession(key: string, value: any) {
    if (value) localStorage.setItem(btoa(key), btoa(JSON.stringify(value)));
    else localStorage.removeItem(btoa(key));
  }

  AbrirModal(modal: ElementRef | undefined) {
    if (modal) {
      let bsModal = Modal.getOrCreateInstance(modal.nativeElement);
      bsModal.show();
    }
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

  showToaster(
    message: string,
    delay: number,
    type: 'success' | 'danger' | 'warning' | 'info' | 'primary'
  ) {
    this.toasterSubject.next({ message, delay: delay * 1000, type });
  }
}
