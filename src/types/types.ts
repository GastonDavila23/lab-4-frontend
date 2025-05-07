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
export interface Categoria {
    id: number;
    denominacion: string;
}
export interface CardProps {
    instrumento: Instrumento;
}

export interface ModalProps {
    show: boolean;
    handleClose: () => void;
    instrumento: Instrumento;
}

export interface CartContextType {
    carrito: CarritoItem[]
    agregarAlCarrito: (instrumento: Instrumento) => void
    limpiarCarrito: () => void
    modificarCantidad: (id: number, cantidad: number) => void
    eliminarItem: (id: number) => void
}

export interface CarritoItem {
    id: number;
    instrumento: string;
    precio: number;
    cantidad: number;
    imagen: string;
}

export interface CarritoAsideProps {
    visible: boolean;
    onClose: () => void;
    modificarCantidad: (id: number, cantidad: number) => void;
    eliminarItem: (id: number) => void;
}

export interface Pedido {
    id: number;
    fecha: string;
    total: number;
    detalles: PedidoDetalle[]; 
}

export interface PedidoDetalle {
    id: number;
    cantidad: number;
    precioUnitario: number;
    instrumento: Instrumento; 
}