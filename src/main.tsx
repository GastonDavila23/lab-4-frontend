import { createRoot } from 'react-dom/client'
import './styles/main.sass'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <App />
  </CartProvider>,
)
