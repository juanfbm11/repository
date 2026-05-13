import { ElementRef, Injectable } from "@angular/core";
import { catchError, map, Observable, of, Subject, tap } from "rxjs";
import { Modal } from "bootstrap";
import { toasterModel } from "../models/core/toaster.model";
import { usuario } from "../models/usuario";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  private urlApiBase = "";
  private toasterSubject = new Subject<toasterModel>();
  private sessionKey = "UsuarioSession ";

  toaster$ = this.toasterSubject.asObservable();

  constructor(private http: HttpClient) {
    this.urlApiBase = environment.urlApiBase;
  }

  login(nombreUsuario: string, contrasena: string): Observable<boolean> {
    // --- MODO DE PRUEBA (MOCK) ---
    
    // 1. Caso ADMIN
    if (nombreUsuario === "admin" && contrasena === "admin") {
      const mockAdmin: usuario = {
        id: 999,
        nombre: "Administrador de Pruebas",
        nombreUsuario: "admin",
        contrasena: "admin",
        correo: "admin@perritos.com",
        fechaRegistro: new Date(),
        rol: "admin"
      };
      this.setSession(this.sessionKey, mockAdmin);
      return of(true);
    }

    // 2. Caso USUARIO NORMAL
    if (nombreUsuario === "user" && contrasena === "user") {
      const mockUser: usuario = {
        id: 888,
        nombre: "Cliente Invitado",
        nombreUsuario: "user",
        contrasena: "user",
        correo: "cliente@correo.com",
        fechaRegistro: new Date(),
        rol: "usuario"
      };
      this.setSession(this.sessionKey, mockUser);
      return of(true);
    }
    // ----------------------------

    return this.http
      .post<usuario>(this.urlApiBase + "usuario/login", {
        nombreUsuario,
        contrasena,
      })
      .pipe(
        tap((rs) => {
          if (rs && rs.id) {
            this.setSession(this.sessionKey, rs);
          }
        }),
        map((rs) => rs && rs.id ? true : false),
        catchError((error) => {
          return of(false);
        })
      );
  }

  getCurrentUser(): usuario | undefined {
    return this.getSession<usuario>(this.sessionKey);
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.rol === "admin";
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
      let backdrop = document.querySelector(".modal-backdrop.fade.show");
      if (backdrop) {
        backdrop.parentNode?.removeChild(backdrop);
      }
      document.body.removeAttribute("style");
      document.body.removeAttribute("class");
    }
  }

  showToaster(
    message: string,
    delay: number,
    type: "success" | "danger" | "warning" | "info" | "primary"
  ) {
    this.toasterSubject.next({ message, delay: delay * 1000, type });
  }
}
