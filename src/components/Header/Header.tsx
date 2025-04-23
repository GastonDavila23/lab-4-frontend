import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.sass'

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar expand="lg" className={`bg-body-tertiary header ${scrolled ? 'shrink' : ''}`}>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
