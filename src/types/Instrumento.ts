import { Categoria } from "./Categoria";
export interface Instrumento {
    id?: number;
    instrumento: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    marca: string;
    modelo: string;
    descripcion: string;
    categoria: Categoria
  }
  