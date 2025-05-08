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
    this.apiBase = environment.urlApiBase + 'productos';
  }

  getproducto(): Observable<Producto[]> {
    return this._http.get<Producto[]>(this._http + '/');
  }
}
