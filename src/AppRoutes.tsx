import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Grilla from './pages/InstrumentosGrilla';
import FormularioInstrumento from './components/FormularioInstrumento/FormularioInstrumento';
import InstrumentosCard from './pages/InstrumentosCard';
import GrillaPedidos from './components/GrillaPedidos/GrillaPedidos';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/instrumentos" element={<InstrumentosCard />}>
        <Route path=":id" element={<InstrumentosCard />} />
      </Route>
      <Route path="/grilla" element={<Grilla />} />
      <Route path="/grilla/crear" element={<FormularioInstrumento />} />
      <Route path="/grilla/editar/:id" element={<FormularioInstrumento />} /> {/* Corregido "editar" */}
      <Route path="/pedidos" element={<GrillaPedidos />} />
    </Routes>
  );
};

export default AppRoutes;