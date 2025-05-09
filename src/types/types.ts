/**********************************************
 * TIPOS PRINCIPALES DE LA APLICACIÓN
 **********************************************/

/**
 * Representa un instrumento musical en el sistema.
 * - `id`: Identificador único (opcional en creación).
 * - `categoria`: Relación con la clasificación del instrumento.
 * - `costoEnvio`: Podría ser string (ej: "Gratis") o number para cálculos.
 */
export interface Instrumento {
    id: number;
    instrumento: string;       // Nombre del instrumento
    imagen: string;            // URL de la imagen
    precio: number;            
    costoEnvio: string;        // Ej: "Gratis" o "$500"
    cantidadVendida: number;   // Popularidad del producto
    marca: string;
    modelo: string;
    descripcion: string;
    categoria: Categoria;      // Clasificación por tipo
}

// Tipo usado para creación, sin `id`
export type NuevoInstrumento = Omit<Instrumento, 'id'>;

/**
 * Categoría para agrupar instrumentos (ej: "Cuerdas", "Vientos").
 */
export interface Categoria {
    id: number;
    denominacion: string;
}

/**********************************************
 * COMPONENTES Y CONTEXTOS
 **********************************************/

/**
 * Props para el componente Card que muestra un instrumento.
 * - `instrumento`: Datos a mostrar en la tarjeta.
 */
export interface CardProps {
    instrumento: Instrumento;
}

/**
 * Props para un modal (ej: edición o detalles de instrumento).
 * - `show`: Controla visibilidad del modal.
 * - `handleClose`: Función para cerrarlo.
 * - `instrumento`: Datos a mostrar/editar.
 */
export interface ModalProps {
    show: boolean;
    handleClose: () => void;
    instrumento: Instrumento;
}

/**
 * Contexto del carrito de compras:
 * - `carrito`: Lista de ítems agregados.
 * - `agregarAlCarrito`: Añade un nuevo instrumento.
 * - `limpiarCarrito`: Vacía el carrito.
 * - `modificarCantidad`: Actualiza cantidad de un ítem.
 * - `eliminarItem`: Quita un ítem del carrito.
 */
export interface CartContextType {
    carrito: CarritoItem[];
    agregarAlCarrito: (instrumento: Instrumento) => void;
    limpiarCarrito: () => void;
    modificarCantidad: (id: number, cantidad: number) => void;
    eliminarItem: (id: number) => void;
}

/**
 * Ítem dentro del carrito de compras.
 * - `id`: Identificador del instrumento.
 * - `cantidad`: Unidades seleccionadas.
 */
export interface CarritoItem {
    id: number;
    instrumento: string;
    precio: number;
    cantidad: number;
    imagen: string;
}

/**
 * Props para el Aside/panel lateral del carrito.
 * - `visible`: Controla si se muestra.
 * - `onClose`: Función para cerrarlo.
 * - Funciones para modificar el carrito.
 */
export interface CarritoAsideProps {
    visible: boolean;
    onClose: () => void;
    modificarCantidad: (id: number, cantidad: number) => void;
    eliminarItem: (id: number) => void;
}

/**********************************************
 * PEDIDOS Y DETALLES
 **********************************************/

// Agregar estos tipos
export interface PedidoResponse {
    id: number;
    fecha: string;
    total: number;
    detalles: DetallePedidoResponse[];
}

export interface DetallePedidoResponse {
    cantidad: number;
    precioUnitario: number;
    instrumento: InstrumentoPedidoResponse;
}

export interface InstrumentoPedidoResponse {
    id: number;
    instrumento: string;
    precio: number;
}
