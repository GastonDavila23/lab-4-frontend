import { Instrumento } from './Instrumento';
import { CarritoItem } from './CarritoItem';

export interface CartContextType {
    carrito: CarritoItem[]
    agregarAlCarrito: (instrumento: Instrumento) => void
    limpiarCarrito: () => void
    modificarCantidad: (id: number, cantidad: number) => void
    eliminarItem: (id: number) => void
  }