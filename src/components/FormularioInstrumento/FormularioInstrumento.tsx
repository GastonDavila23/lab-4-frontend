// FormularioInstrumento.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Instrumento, Categoria } from '../../types/types';
import Contenedor from '../Contenedor/Contenedor';
import Titulo from '../Titulo/Titulo';
import './FormularioInstrumento.sass';
import {
  fetchCategorias,
  fetchInstrumentoById,
  createInstrumento,
  updateInstrumento
} from '../../services/api';

const FormularioInstrumento: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Instrumento>({
    id: 0,
    instrumento: '',
    marca: '',
    modelo: '',
    imagen: '',
    precio: 0,
    costoEnvio: '',
    cantidadVendida: 0,
    descripcion: '',
    categoria: { id: 0, denominacion: '' }
  });

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Cargar categorías
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await fetchCategorias();
        setCategorias(data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    cargarCategorias();
  }, []);

  // Cargar instrumento para edición
  useEffect(() => {
    const cargarInstrumento = async () => {
      if (id) {
        try {
          const data = await fetchInstrumentoById(Number(id));
          setFormData({
            ...data,
            id: Number(id) // Fuerza el ID desde la URL
          });
        } catch (error) {
          console.error('Error al cargar instrumento:', error);
          navigate('/grilla');
        }
      }
    };
    cargarInstrumento();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'categoria.id') {
      setFormData({
        ...formData,
        categoria: {
          ...formData.categoria,
          id: Number(value),
          denominacion: categorias.find(c => c.id === Number(value))?.denominacion || ''
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === 'precio' || name === 'cantidadVendida' ? Number(value) : value
      });
    }
  };

  const validar = (data: Instrumento): string | null => {
    if (!data.instrumento.trim()) return 'El nombre del instrumento es obligatorio';
    if (!data.marca.trim()) return 'La marca es obligatoria';
    if (!data.modelo.trim()) return 'El modelo es obligatorio';
    if (!data.imagen.trim()) return 'Debes indicar la URL de la imagen';
    if (data.precio <= 0) return 'El precio debe ser mayor que 0';
    if (!data.costoEnvio.trim()) return 'Debes especificar el costo de envío';
    if (data.categoria.id === 0) return 'Selecciona una categoría';
    if (!data.descripcion.trim()) return 'La descripción es obligatoria';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMsg = validar(formData);
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    try {
      if (isEditMode) {
        await updateInstrumento(formData.id, formData);
      } else {
        const { id, ...datosSinId } = formData;
        await createInstrumento(datosSinId);
      }
      navigate('/grilla');
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : 'Error desconocido');
      alert('Error al guardar el instrumento');
    }
  };

  if (isEditMode && !formData.id) return <div>Cargando instrumento...</div>;

  return (
    <Contenedor className="contenedor-formulario">
      <Titulo texto={isEditMode ? 'Modificar Instrumento' : 'Crear Nuevo Instrumento'} />
      <form className="formulario-instrumento" onSubmit={handleSubmit}>

        {/* Campo Categoría */}
        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria.id"
            value={formData.categoria.id}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
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
            required
          />
        </div>

        <div>
          <label htmlFor="precio">Precio</label>
          <input
            id="precio"
            type="number"
            name="precio"
            min={1}
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio"
            required
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
            required
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
            required
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
            required
          />
        </div>

        <button className="boton-formulario" type="submit">
          {isEditMode ? 'Guardar Cambios' : 'Crear Instrumento'}
        </button>
      </form>
    </Contenedor>
  );
};

export default FormularioInstrumento;