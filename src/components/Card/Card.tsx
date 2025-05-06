import './Card.sass';
import { useState } from 'react';
import { CardProps } from '../../types/CardsProps.ts';
import Modal from '../Modal/Modal.tsx';
import { useCart } from '../../context/CartContext'; // Importamos el hook del contexto

const Card: React.FC<CardProps> = ({ instrumento }) => {
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const { carrito, agregarAlCarrito, modificarCantidad, eliminarItem } = useCart(); // Usamos el hook

    // Verificar si el instrumento ya está en el carrito
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
                {instrumento.costoEnvio == 'G' ? (
                    <div className='envio-gratis'>
                        <img src="./images/camion.png" alt="logo-envio-gratis" />
                        <p>Envío gratis a todo el país</p>
                    </div>
                ) : (
                    <p className='card-envio'>Costo de Envio Interior de Argentina: ${instrumento.costoEnvio}</p>
                )}
                <p className='card-vendidos'>{instrumento.cantidadVendida} vendidos</p>

                <div className='card-buttons'>
                    <button className='ver-mas' onClick={handleShow}>Ver detalles</button>

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