import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reservas';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  apiBase = '';

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'reserva';
  }

  getreserva(): Observable<Reserva[]> {
    return this._http.get<Reserva[]>(this.apiBase);
  }

  putreserva(r: Reserva): Observable<Reserva> {
    return this._http.put<Reserva>(`${this.apiBase}/${r.id}`, r);
  }

  postreserva(r: Reserva): Observable<Reserva> {
    return this._http.post<Reserva>(this.apiBase, r);
  }

  deletereserva(id: number): Observable<Reserva[]> {
    return this._http.delete<Reserva[]>(`${this.apiBase}/${id}`);
  }
}
