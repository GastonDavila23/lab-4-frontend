import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  categoriaId: number; // Campo para la categoría
}

interface Categoria {
  id: number;
  nombre: string;
}

const FormularioInstrumento: React.FC = () => {
  const { id } = useParams(); // Obtener el id desde la URL
  const [formData, setFormData] = useState<Instrumento>({
    instrumento: '',
    marca: '',
    modelo: '',
    imagen: '',
    precio: 0,
    costoEnvio: '',
    cantidadVendida: 0,
    descripcion: '',
    categoriaId: 0, // Iniciar con valor por defecto
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]); // Estado para las categorías
  const [isEditMode, setIsEditMode] = useState(false); // Determinar si estamos en modo edición
  const navigate = useNavigate(); // Redirigir después de la creación o edición

  // Obtener las categorías del backend
  useEffect(() => {
    fetch('http://localhost:8080/api/categorias') // Asegúrate de que esta URL sea correcta
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener categorías:', error));
  }, []);

  // Obtener los datos del instrumento si estamos en modo de edición
  useEffect(() => {
    if (id) {
      setIsEditMode(true); // Modo edición si hay un id
      fetch(`http://localhost:8080/api/instrumentos/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData(data); // Setear los datos del instrumento en el formulario
        })
        .catch((error) => console.error('Error al obtener el instrumento:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.id) {
      // Si tiene id, actualizamos el instrumento
      fetch(`http://localhost:8080/api/instrumentos/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          navigate('/grilla'); // Redirigir a la página de grilla después de actualizar
        })
        .catch((error) => console.error('Error al actualizar el instrumento:', error));
    } else {
      // Si no tiene id, es un nuevo instrumento, crear
      fetch('http://localhost:8080/api/instrumentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          navigate('/grilla'); // Redirigir a la página de grilla después de crear
        })
        .catch((error) => console.error('Error al crear el instrumento:', error));
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={() => navigate('/grilla')}>X</button>
        <h2>{isEditMode ? 'Modificar Instrumento' : 'Crear Instrumento'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="instrumento"
            value={formData.instrumento}
            onChange={handleChange}
            placeholder="Instrumento"
          />
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            placeholder="Marca"
          />
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            placeholder="Modelo"
          />
          <input
            type="text"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            placeholder="Imagen"
          />
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio"
          />
          <input
            type="text"
            name="costoEnvio"
            value={formData.costoEnvio}
            onChange={handleChange}
            placeholder="Costo Envío"
          />
          <input
            type="number"
            name="cantidadVendida"
            value={formData.cantidadVendida}
            onChange={handleChange}
            placeholder="Cantidad Vendida"
          />
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
          />
          {/* Select para la categoría */}
          <select
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          <button type="submit">{isEditMode ? 'Modificar Instrumento' : 'Crear Instrumento'}</button>
        </form>
      </div>
    </div>
  );
};

export default FormularioInstrumento;
