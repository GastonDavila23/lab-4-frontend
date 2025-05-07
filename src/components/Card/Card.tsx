import './Card.sass'
import { useState } from 'react'
import { CardProps } from '../../types/types'
import Modal from '../Modal/Modal.tsx'
import { useCart } from '../../context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Card: React.FC<CardProps> = ({ instrumento }) => {
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const { carrito, agregarAlCarrito, modificarCantidad, eliminarItem } = useCart();

    const itemEnCarrito = carrito.find((item) => item.id === instrumento.id);

    return (
        <div className='card-container'>
            <div className='card-image'>
                <img
                    className='card-image'
                    src={`./images/${instrumento.imagen}`}
                    alt={instrumento.imagen}
                />
            </div>
            <div className='card-info'>
                <h1 className='card-titulo'>{instrumento.instrumento}</h1>
                <p className='card-precio'>${instrumento.precio}</p>
                <div className='card-precio-envio'>
                    {instrumento.costoEnvio === 'G' ? (
                        <div className='envio-gratis'>
                            <img src="./images/camion.png" alt="logo-envio-gratis" />
                            <p>Envío gratis</p>
                        </div>
                    ) : (
                        <p className='card-envio'>Costo envio: ${instrumento.costoEnvio}</p>
                    )}
                </div>
                <p className='card-vendidos'>{instrumento.cantidadVendida} vendidos</p>

                <div className='card-buttons-container'>
                    <button className='ver-mas' onClick={handleShow}>Ver detalles</button>

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
                </div>

                <Modal
                    show={showModal}
                    handleClose={handleClose}
                    instrumento={instrumento}
                />
            </div>
        </div>
    );
};

export default Card;