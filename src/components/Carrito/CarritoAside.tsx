import { useCart } from '../../context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './CarritoAside.sass'
import Titulo from '../Titulo/Titulo';


export interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}
type CarritoAsideProps = {
  visible: boolean
  onClose: () => void
  modificarCantidad: (id: number, cantidad: number) => void;
  eliminarItem: (id: number) => void;
}

export const CarritoAside: React.FC<CarritoAsideProps> = ({ visible, onClose }) => {
  const { carrito, limpiarCarrito, modificarCantidad, eliminarItem } = useCart()

  if (!visible) return null

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  return (
    <div className="carrito-overlay" onClick={onClose}>
      <aside className="carrito-aside" onClick={e => e.stopPropagation()}>
        <Titulo texto='Carrito' />
        {carrito.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '20px' }}>El carrito está vacío</p>
        ) : (
          <ul style={{ padding: 0, margin: 0 }}>
            {carrito.map(item => (
              <li key={item.id} className='carrito-item'>

                <div className='contenedor-texto'>
                  <span>{item.instrumento}</span>
                  <span>${item.precio.toFixed(2)}</span>
                </div>

                <div className='botones-contenedor'>
                  <div>
                    <button className='cantidad' onClick={() => modificarCantidad(item.id, item.cantidad - 1)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span style={{ padding: '0 10px' }}>{item.cantidad}</span>
                    <button className='cantidad' onClick={() => modificarCantidad(item.id, item.cantidad + 1)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <button className='eliminar' onClick={() => eliminarItem(item.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>

              </li>
            ))}
          </ul>
        )}
        <div className='botones-carrito'>
          <p style={{ margin: '8px', textAlign: 'center', fontSize: '1.2em', fontWeight: '600' }}>Total: ${total.toFixed(2)}</p>
          <button className='vaciar-carrito' onClick={limpiarCarrito}>Vaciar Carrito</button>
          <button className='cerrar-carrito' onClick={onClose}>Cerrar</button>
        </div>
      </aside>
    </div>
  )
}
