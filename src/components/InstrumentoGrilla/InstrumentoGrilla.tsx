import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Instrumento {
  id?: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
}

const InstrumentoGrilla: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const navigate = useNavigate();

  // Obtener todos los instrumentos del backend
  useEffect(() => {
    fetch('http://localhost:8080/api/instrumentos')
      .then((response) => response.json())
      .then((data) => setInstrumentos(data))
      .catch((error) => console.error('Error al obtener los instrumentos:', error));
  }, []);

  // Redirigir a la subruta para crear un nuevo instrumento
  const handleCrear = () => {
    navigate('/grilla/crear');
  };

  // Redirigir a la subruta para modificar un instrumento existente
  const handleEditar = (id: number) => {
    navigate(`/grilla/${id}`);
  };

  // Eliminar un instrumento
  const handleEliminar = (id: number) => {
    fetch(`http://localhost:8080/api/instrumentos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setInstrumentos(instrumentos.filter((instrumento) => instrumento.id !== id));
    });
  };

  return (
    <div>
      <h2>Instrumentos Disponibles</h2>
      <button onClick={handleCrear}>Crear Nuevo Instrumento</button>

      <table>
        <thead>
          <tr>
            <th>Instrumento</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {instrumentos.map((instrumento) => (
            <tr key={instrumento.id}>
              <td>{instrumento.instrumento}</td>
              <td>{instrumento.marca}</td>
              <td>{instrumento.modelo}</td>
              <td>
                <button onClick={() => handleEditar(instrumento.id!)}>Modificar</button>
                <button onClick={() => handleEliminar(instrumento.id!)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstrumentoGrilla;
