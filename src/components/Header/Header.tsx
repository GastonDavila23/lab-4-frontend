import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { CarritoAside } from '../Carrito/CarritoAside'
import './Header.sass'

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {

  const { modificarCantidad, eliminarItem } = useCart();
  const navigate = useNavigate();
  const { carrito } = useCart();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      <Navbar expand="lg" className='header'>
        <Container>
          <Navbar.Brand onClick={() => navigate('/')}>
            <img
              className='logo'
              src="./images/lab-4-logo.png"
              alt="laboratorio-logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='link' onClick={() => navigate('/')}>Inicio</Nav.Link>
              <Nav.Link className='link' onClick={() => navigate('/instrumentos')}>Instrumentos</Nav.Link>
              <Nav.Link className='link' onClick={() => navigate('/grilla')}>Grilla</Nav.Link>
              <Nav.Link className='link' onClick={() => navigate('/pedidos')}>Pedidos</Nav.Link>
            </Nav>
            <div className="acciones-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="modo-icono" onClick={toggleDarkMode} style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </div>
              <div className="carrito-icono" onClick={() => setMostrarCarrito(true)} style={{ cursor: 'pointer', position: 'relative' }}>
                <FontAwesomeIcon icon={faCartShopping} />
                {cantidadTotal > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-10px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px'
                  }}>
                    {cantidadTotal}
                  </span>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CarritoAside
        visible={mostrarCarrito}
        onClose={() => setMostrarCarrito(false)}
        modificarCantidad={(id, cantidad) => modificarCantidad(id, cantidad)}
        eliminarItem={(id) => eliminarItem(id)}
      />
    </>
  );
};

export default Header;
