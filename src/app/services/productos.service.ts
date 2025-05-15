import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Producto } from '../models/productos';

 @Injectable({
   providedIn: 'root',
})
export class ProductosService {
  apiBase = '';

  constructor(private _http: HttpClient) {
    this.apiBase = environment.urlApiBase + 'producto';
  }

  getproducto(): Observable<Producto[]> {
    return this._http.get<Producto[]>(this.apiBase);
  }
   
  putproducto(p:Producto):Observable<Producto>{
    return this._http.put<Producto>(this.apiBase, p);
  }

  postproducto(p:Producto):Observable<Producto>{
    return this._http.post<Producto>(this.apiBase, p)
  }

  deleteproducto(): Observable<Producto[]>{
    return this._http.delete<Producto[]>(this.apiBase);
  }
}
