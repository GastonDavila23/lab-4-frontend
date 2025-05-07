import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Instrumento, Categoria } from '../../types/types'
import Contenedor from '../Contenedor/Contenedor'
import Titulo from '../Titulo/Titulo'
import './FormularioInstrumento.sass'

const FormularioInstrumento: React.FC = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<Instrumento>({
    instrumento: '',
    marca: '',
    modelo: '',
    imagen: '',
    precio: 0,
    costoEnvio: '',
    cantidadVendida: 0,
    descripcion: '',
    categoria: { id: 0, denominacion: '' },
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  // Obtener las categorías del backend
  useEffect(() => {
    fetch('http://localhost:8080/api/categoria')
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener categorías:', error));
  }, []);

  // Obtener los datos del instrumento si estamos en modo de edición
  useEffect(() => {
    if (id) {
      setIsEditMode(true);  // Modo edición si hay un id
      fetch(`http://localhost:8080/api/instrumentos/id/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData(data); // Setear los datos del instrumento en el formulario
        })
        .catch((error) => console.error('Error al obtener el instrumento:', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Si el nombre es "categoria.id", actualizamos el id de la categoria dentro de "formData"
    if (name === "categoria.id") {
      setFormData({
        ...formData,
        categoria: { ...formData.categoria, id: Number(value) },  // Actualizamos solo el id de la categoria
      });
    } else {
      // Si no es categoria.id, actualizamos normalmente
      setFormData({ ...formData, [name]: value });
    }
  };

  //Actualizar Instrumento
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convertir categoriaId a un objeto con id
    const updatedData = {
      ...formData,
      categoria: { id: Number(formData.categoria.id) },  // Asegúrate de convertir categoriaId a un objeto
    };

    console.log(updatedData); // Verifica la estructura antes de enviarlo al backend

    // Validación de categoría
    if (formData.categoria.id === 0) {
      alert('Selecciona una categoría');
      return;
    }

    if (formData.id) {
      // Enviar el PUT para actualizar el instrumento
      fetch(`http://localhost:8080/api/instrumentos/actualizar/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),  // Envía el cuerpo con la estructura correcta
      })
        .then(() => {
          navigate('/grilla');
        })
        .catch((error) => console.error('Error al actualizar el instrumento:', error));
    } else {
      // Enviar el POST para crear el instrumento
      fetch('http://localhost:8080/api/instrumentos/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),  // Envía el cuerpo con la estructura correcta
      })
        .then(() => {
          navigate('/grilla');
        })
        .catch((error) => console.error('Error al crear el instrumento:', error));
    }
  };


  return (
    <>
      <Contenedor className='contenedor-formulario'>
        <Titulo texto={isEditMode ? 'Modificar Instrumento' : 'Crear Nuevo Instrumento'} />
        <form className='formulario-instrumento' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria.id"
              value={formData.categoria.id}
              onChange={handleChange}
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="instrumento">Instrumento</label>
            <input
              id="instrumento"
              type="text"
              name="instrumento"
              value={formData.instrumento}
              onChange={handleChange}
              placeholder="Instrumento"
            />
          </div>

          <div>
            <label htmlFor="marca">Marca</label>
            <input
              id="marca"
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              placeholder="Marca"
            />
          </div>

          <div>
            <label htmlFor="modelo">Modelo</label>
            <input
              id="modelo"
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              placeholder="Modelo"
            />
          </div>

          <div>
            <label htmlFor="imagen">Imagen link</label>
            <input
              id="imagen"
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="Imagen"
            />
          </div>

          <div>
            <label htmlFor="precio">Precio</label>
            <input
              id="precio"
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Precio"
            />
          </div>

          <div>
            <label htmlFor="costoEnvio">Costo de Envío</label>
            <input
              id="costoEnvio"
              type="text"
              name="costoEnvio"
              value={formData.costoEnvio}
              onChange={handleChange}
              placeholder="Costo de Envío"
            />
          </div>

          <div>
            <label htmlFor="cantidadVendida">Cantidad Vendida</label>
            <input
              id="cantidadVendida"
              type="number"
              name="cantidadVendida"
              value={formData.cantidadVendida}
              onChange={handleChange}
              placeholder="Cantidad Vendida"
            />
          </div>

          <div>
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
            />
          </div>

          <button className='boton-formulario' type="submit">{isEditMode ? 'Modificar' : 'Crear'}</button>
        </form>
      </Contenedor>
    </>

  );
};

export default FormularioInstrumento;
