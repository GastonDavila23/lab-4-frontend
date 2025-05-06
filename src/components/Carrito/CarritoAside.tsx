import { useCart } from '../../context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import './CarritoAside.sass'


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
        <h2>Carrito</h2>
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
        <ul>
          {carrito.map(item => (
            <li key={item.id}>
              <img src={item.imagen} alt={item.instrumento} style={{ width: '50px', height: '50px' }} />
              <span>{item.instrumento}</span>
              <span>${item.precio.toFixed(2)}</span>
              <div>
                <button onClick={() => modificarCantidad(item.id, item.cantidad - 1)}>
                <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{item.cantidad}</span>
                <button onClick={() => modificarCantidad(item.id, item.cantidad + 1)}>
                <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
        )}
        <p>Total: ${total.toFixed(2)}</p>
        <button onClick={limpiarCarrito}>Vaciar Carrito</button>
        <button onClick={onClose}>Cerrar</button>
      </aside>
    </div>
  )
}
