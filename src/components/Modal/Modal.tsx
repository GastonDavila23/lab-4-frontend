import React, { useState, useEffect } from 'react';

interface Instrumento {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
  categoria: { id: number };
}

const InstrumentosGrilla: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [newInstrumento, setNewInstrumento] = useState<Instrumento>({
    id: 0,
    instrumento: '',
    marca: '',
    modelo: '',
    imagen: '',
    precio: 0,
    costoEnvio: '',
    cantidadVendida: 0,
    descripcion: '',
    categoria: { id: 0 },
  });

  // Obtener todos los instrumentos del backend
  useEffect(() => {
    fetch('http://localhost:8080/api/instrumentos')
      .then((response) => response.json())
      .then((data) => setInstrumentos(data))
      .catch((error) => console.error('Error al obtener los instrumentos:', error));
  }, []);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8080/api/instrumentos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      // Filtrar el instrumento eliminado de la lista
      setInstrumentos(instrumentos.filter((instrumento) => instrumento.id !== id));
    });
  };

  // Manejar cambios en el formulario de creación
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInstrumento({
      ...newInstrumento,
      [name]: value,
    });
  };

  // Crear un nuevo instrumento
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/instrumentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInstrumento),
    })
      .then((response) => response.json())
      .then((data) => {
        setInstrumentos([...instrumentos, data]);
        // Resetear el formulario
        setNewInstrumento({
          id: 0,
          instrumento: '',
          marca: '',
          modelo: '',
          imagen: '',
          precio: 0,
          costoEnvio: '',
          cantidadVendida: 0,
          descripcion: '',
          categoria: { id: 0 },
        });
      })
      .catch((error) => console.error('Error al crear el instrumento:', error));
  };

  return (
    <div>
      <h2>Instrumentos Disponibles</h2>

      {/* Formulario para crear un nuevo instrumento */}
      <h3>Agregar Nuevo Instrumento</h3>
      <form onSubmit={handleCreate}>
        <div>
          <label>Instrumento</label>
          <input
            type="text"
            name="instrumento"
            value={newInstrumento.instrumento}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Marca</label>
          <input
            type="text"
            name="marca"
            value={newInstrumento.marca}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Modelo</label>
          <input
            type="text"
            name="modelo"
            value={newInstrumento.modelo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            name="imagen"
            value={newInstrumento.imagen}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={newInstrumento.precio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Costo de Envío</label>
          <input
            type="text"
            name="costoEnvio"
            value={newInstrumento.costoEnvio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Cantidad Vendida</label>
          <input
            type="number"
            name="cantidadVendida"
            value={newInstrumento.cantidadVendida}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={newInstrumento.descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Categoría ID</label>
          <input
            type="number"
            name="categoria.id"
            value={newInstrumento.categoria.id}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Crear Instrumento</button>
      </form>

      {/* Tabla de instrumentos */}
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
                <button>Editar</button>
                <button onClick={() => handleDelete(instrumento.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstrumentosGrilla;
