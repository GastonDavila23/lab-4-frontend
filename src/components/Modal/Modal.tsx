import './Modal.sass'
import { ModalProps } from '../../types/types'
import { useCart } from '../../context/CartContext' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Modal: React.FC<ModalProps> = ({ show, handleClose, instrumento }) => {
    const { carrito, agregarAlCarrito, modificarCantidad, eliminarItem } = useCart(); // Usamos el hook

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
                        <div className='modal-precio-envio'>
                            {instrumento.costoEnvio === 'G' ? (
                                <div className='envio-gratis'>
                                    <img src="./images/camion.png" alt="logo-envio-gratis" />
                                    <p>Envío gratis </p>
                                </div>
                            ) : (
                                <p className='envio-pago'>Costo envio: $ {instrumento.costoEnvio}</p>
                            )}
                        </div>
                        <div className='modal-footer'>
                            <div className="comprar-wrapper">
                                {itemEnCarrito ? (
                                    <div className='botones-cantidad'>
                                        <button
                                            className='boton-disminuir'
                                            onClick={() => modificarCantidad(instrumento.id!, itemEnCarrito.cantidad - 1)}
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <span className='cantidad'>{itemEnCarrito.cantidad}</span>
                                        <button
                                            className='boton-aumentar'
                                            onClick={() => modificarCantidad(instrumento.id!, itemEnCarrito.cantidad + 1)}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                        <button
                                            className='boton-eliminar'
                                            onClick={() => eliminarItem(instrumento.id!)}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className='agregar-carrito'
                                        onClick={() => agregarAlCarrito(instrumento)}
                                    >
                                        Comprar
                                    </button>
                                )}
                            </div>
                            <button className='cerrar' onClick={handleClose}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;