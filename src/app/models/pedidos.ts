import { Producto } from "./productos";

export interface Pedido {
  id: number;
  fechaCompra:Date;
  email: string;
  nombre: string;
  ciudad: string;
  direccion: string;
  tipoEnvio: string;
  metodoPago: string;  
  total:number;
  productos: []; // Puedes incluir los productos del carrito
}