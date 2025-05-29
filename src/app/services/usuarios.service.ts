import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  apiBase = '';

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'usuario';
  }

  getusuario(): Observable<usuario[]> {
    return this._http.get<usuario[]>(this.apiBase);
  }

  putusuario(u: usuario): Observable<usuario> {
    return this._http.put<usuario>(`${this.apiBase}/${u.id}`, u);
  }

  postusuario(u: usuario): Observable<usuario> {
    return this._http.post<usuario>(this.apiBase, u);
  }

  deleteusuario(id: number): Observable<usuario[]> {
    return this._http.delete<usuario[]>(`${this.apiBase}/${id}`);
  }
}

