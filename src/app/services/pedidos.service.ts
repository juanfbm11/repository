import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedidos';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  apiBase = '';

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'pedidos';
  }

  crearPedido(pedido: Pedido): Observable<Pedido> {
    return this._http.post<Pedido>(this.apiBase, pedido);
  }

  getpedido(): Observable<Pedido[]> {
    return this._http.get<Pedido[]>(this.apiBase);
  }

  postpedido(pedido: Pedido): Observable<Pedido> {
    return this._http.post<Pedido>(this.apiBase, pedido);
  }

  putpedido(p: Pedido): Observable<Pedido> {
    return this._http.put<Pedido>(`${this.apiBase}/${p.id}`, p);
  }

  deletepedido(id:number): Observable<Pedido[]>{
    return this._http.delete<Pedido[]>(`${this.apiBase}/${id}`);
  }
}
