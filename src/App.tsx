import Header from './components/Header/Header.tsx'
import Footer from './components/Footer/Footer.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import AppRoutes from './routes/AppRoutes.tsx'
function App() {

  return (
    <>
      <Router>
        <Header />
        <Container className='min-vh-100'>
          <AppRoutes />
        </Container>
        <Footer />
      </Router>
    </>
  )
}

export default App
