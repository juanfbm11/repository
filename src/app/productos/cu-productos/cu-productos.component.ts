import { Component, Input } from '@angular/core';
import { Producto } from '../../models/productos';

@Component({
  selector: 'app-cu-productos',
  standalone: false,
  templateUrl: './cu-productos.component.html',
  styleUrl: './cu-productos.component.css',
})
export class CuProductosComponent {
  @Input() producto: Producto | undefined;
}
