import './Card.sass'
import { useState } from 'react'
import { Instrumento } from '../../types/Instrumento.ts'
import Modal from '../Modal/Modal.tsx'

interface CardProps {
    instrumento: Instrumento;
}
const Card: React.FC<CardProps> = ({ instrumento }) => {

    const [showModal, setShowModal] = useState(false)
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

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
                )
                }
                <p className='card-vendidos'>{instrumento.cantidadVendida} vendidos</p>
                <div>
                <button className='ver-mas' onClick={handleShow}>Ver detalles</button>
                <Modal
                    show={showModal}
                    handleClose={handleClose}
                    instrumento={instrumento}
                />
            </div>
            </div>
        </div>
    )
}

export default Card
