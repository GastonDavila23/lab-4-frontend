import './Modal.sass';
import { ModalProps } from '../../types/ModalProps.ts';
import { useCart } from '../../context/CartContext'; // Importamos el hook del contexto

const Modal: React.FC<ModalProps> = ({ show, handleClose, instrumento }) => {
    const { carrito, agregarAlCarrito, modificarCantidad, eliminarItem } = useCart(); // Usamos el hook

    // Verificar si el instrumento ya está en el carrito
    const itemEnCarrito = carrito.find((item) => item.id === instrumento.id);

    if (!show) return null;

    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal">
                <div className="modal-body">

                    <div className='modal-imagen'>
                        <div className='contenedor-imagen'>
                            <img
                                src={`./images/${instrumento.imagen}`}
                                alt={instrumento.instrumento}
                            />
                        </div>
                        <div className='modal-descripcion'>
                            <p>Descripción:</p>
                            <p>{instrumento.descripcion}</p>
                        </div>
                    </div>

                    <div className='modal-info'>
                        <p className='modal-vendidos'>{instrumento.cantidadVendida} vendidos</p>
                        <h2 className='modal-titulo'>{instrumento.instrumento}</h2>
                        <p className='modal-precio'>$ {instrumento.precio}</p>
                        <p className='modal-marca'>Marca: {instrumento.marca}</p>
                        <p className='modal-modelo'>Modelo: {instrumento.modelo}</p>
                        <div className='modal-envio'>
                            <p className='envio m-0'>Costo Envío:</p>
                            {instrumento.costoEnvio == 'G' ? (
                                <div className='envio-gratis'>
                                    <img src="./images/camion.png" alt="logo-envio-gratis" />
                                    <p>Envío gratis </p>
                                </div>
                            ) : (
                                <p className='card-envio'>$ {instrumento.costoEnvio}</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            {itemEnCarrito ? (
                                <div className='botones-cantidad'>
                                    <button
                                        className='boton-disminuir'
                                        onClick={() => modificarCantidad(instrumento.id!, itemEnCarrito.cantidad - 1)}
                                    >
                                        -
                                    </button>
                                    <span className='cantidad'>{itemEnCarrito.cantidad}</span>
                                    <button
                                        className='boton-aumentar'
                                        onClick={() => modificarCantidad(instrumento.id!, itemEnCarrito.cantidad + 1)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className='boton-eliminar'
                                        onClick={() => eliminarItem(instrumento.id!)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className='agregar-carrito'
                                    onClick={() => agregarAlCarrito(instrumento)}
                                >
                                    Agregar al carrito
                                </button>
                            )}
                            <button className='cerrar-modal' onClick={handleClose}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;