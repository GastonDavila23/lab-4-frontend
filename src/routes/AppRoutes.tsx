import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Grilla from '../pages/InstrumentosGrilla';
import FormularioInstrumento from '../components/FormularioInstrumento/FormularioInstrumento';
import InstrumentosCard from '../pages/InstrumentosCard';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/instrumentos" element={<InstrumentosCard />} />
        <Route path="/instrumentos/:id" element={<InstrumentosCard />} />
      <Route path="/grilla" element={<Grilla />} />
        <Route path="/grilla/crear" element={<FormularioInstrumento />} />
        {/* Esta ruta maneja tanto la creación como la edición, usando un id si se pasa */}
        <Route path="/grilla/:id" element={<FormularioInstrumento />} />
    </Routes>
  );
};

export default AppRoutes;
