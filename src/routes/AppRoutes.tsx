import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Grilla from '../pages/Grilla';
import FormularioInstrumento from '../components/FormularioInstrumento/FormularioInstrumento';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grilla" element={<Grilla />} />
      <Route path="/grilla/crear" element={<FormularioInstrumento />} />
      <Route path="/grilla/modificar/:id" element={<FormularioInstrumento />} />
    </Routes>
  );
};

export default AppRoutes;
