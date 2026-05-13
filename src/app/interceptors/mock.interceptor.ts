import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Simular retraso de red para ver los estados de carga (profesionalismo)
    const simulatedDelay = 800;

    // Mock para Productos si la API falla o no existe
    if (request.url.endsWith("/producto") && request.method === "GET") {
      const mockProductos = [
        { id: 1, nombre: "Hamburguesa Clásica", precio: 15000, categoria: "Hamburguesa", image: "Productos-Hamburguesa Clasica.jpeg" },
        { id: 2, nombre: "Perro Quesudo", precio: 12000, categoria: "Perro", image: "Productos-Perro caliente Quesudo.jpg" },
        { id: 3, nombre: "Jugo Natural", precio: 5000, categoria: "Bebida", image: "Productos-Jugos.jpg" }
      ];
      return of(new HttpResponse({ status: 200, body: mockProductos })).pipe(delay(simulatedDelay));
    }

    return next.handle(request);
  }
}
