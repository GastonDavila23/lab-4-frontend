// así usamos instrumentos.js desde el front
// export const getInstrumentosJSON = async () => {
//     const response = await fetch('/services/instrumentos.json');
//     const data = await response.json();
//     return data.instrumentos;
// };


// FETCH API
// const BACKEND_ENDPOINT = 'http://localhost:8080/api/instrumentos';

// export const getInstrumentos = async () => {
//   const response = await fetch(`${BACKEND_ENDPOINT}/all`);
//   if (!response.ok) throw new Error("Error al obtener instrumentos");
//   return await response.json();
// };

// export const getInstrumentoById = async (id: number) => {
//   const response = await fetch(`${BACKEND_ENDPOINT}/id/${id}`);
//   if (!response.ok) throw new Error("Instrumento no encontrado");
//   return await response.json();
// };

// AXIOS API
import axios, { AxiosError } from 'axios';
import { Instrumento, NuevoInstrumento, Categoria, PedidoResponse } from '../types/types';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Función para obtener todos los instrumentos
export const fetchInstrumentos = async (): Promise<Instrumento[]> => {
    try {
        const response = await apiClient.get<Instrumento[]>('/instrumentos/all');
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(`Error al obtener instrumentos: ${axiosError.response?.data?.message || axiosError.message}`);
    }
};

// Función para obtener un instrumento por ID
export const getInstrumentoById = async (id: number): Promise<Instrumento> => {
    try {
        const response = await apiClient.get<Instrumento>(`/instrumentos/id/${id}`); // Ruta completa
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(
            `Instrumento no encontrado: ${axiosError.response?.data?.message || axiosError.message}`
        );
    }
};

// Funcion para obtener un instrumento por ID (para editar)
export const fetchInstrumentoById = async (id: number): Promise<Instrumento> => {
    try {
        const response = await apiClient.get<Instrumento>(`/instrumentos/id/${id}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(`Error al obtener instrumento: ${axiosError.response?.data?.message || axiosError.message}`);
    }
};

// Función para obtener todos los pedidos
// Modificar fetchPedidos
export const fetchPedidos = async (): Promise<PedidoResponse[]> => {
    try {
        const response = await apiClient.get<PedidoResponse[]>('/pedido');
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(`Error al obtener pedidos: ${axiosError.response?.data?.message || axiosError.message}`);
    }
};

// Funcion para ver las categorias
export const fetchCategorias = async (): Promise<Categoria[]> => {
    try {
        const response = await apiClient.get<Categoria[]>('/categoria');
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(`Error al obtener categorías: ${axiosError.response?.data?.message || axiosError.message}`);
    }
};

// Función para seleccionar un instrumento por categoría
export const fetchInstrumentosPorCategoria = async (categoriaId: number): Promise<Instrumento[]> => {
    try {
        const response = await apiClient.get<Instrumento[]>(`/instrumentos/categoria/${categoriaId}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(`Error al filtrar instrumentos: ${axiosError.response?.data?.message || axiosError.message}`);
    }
};

// Función para borrar un instrumento
export const deleteInstrumento = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`/instrumentos/borrar/${id}`);
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(`Error al eliminar instrumento: ${axiosError.response?.data?.message || axiosError.message}`);
    }
};

// Funcion para crear un nuevo instrumento
export const createInstrumento = async (instrumento: NuevoInstrumento): Promise<Instrumento> => {
  try {
    const response = await apiClient.post<Instrumento>('/instrumentos/crear', instrumento);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(`Error al crear instrumento: ${axiosError.response?.data?.message || axiosError.message}`);
  }
};

// Funcion para modificar un instrumento
export const updateInstrumento = async (id: number, instrumento: Instrumento): Promise<Instrumento> => {
    try {
        const response = await apiClient.put<Instrumento>(`/instrumentos/actualizar/${id}`, instrumento);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        throw new Error(`Error al actualizar instrumento: ${axiosError.response?.data?.message || axiosError.message}`);
    }
};