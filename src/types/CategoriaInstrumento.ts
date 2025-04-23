import { Instrumento } from './Instrumento';
import { Categoria } from './Categoria';
export interface CategoriaInstrumento {
    instrumentos: Instrumento[]
    categoria: Categoria
}