import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.sass'
const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary header">
                <Container>
                    <Navbar.Brand className='logo' onClick={() => navigate('/')}>Laboratorio 4</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className='link' onClick={() => navigate('/')}>Home</Nav.Link>
                            <Nav.Link className='link' onClick={() => navigate('/instrumentos')}>Instrumentos</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header