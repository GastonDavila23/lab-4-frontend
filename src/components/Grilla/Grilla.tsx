import './Grilla.sass'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Instrumento, Categoria } from '../../types/types'
import Titulo from '../Titulo/Titulo'
import Contenedor from '../Contenedor/Contenedor'
import { fetchCategorias, fetchInstrumentos, fetchInstrumentosPorCategoria, deleteInstrumento } from '../../services/api'

const Grilla: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Obtener categorías
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await fetchCategorias();
        setCategorias(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    };
    cargarCategorias();
  }, []);

  // Obtener instrumentos
  useEffect(() => {
    const cargarInstrumentos = async () => {
      try {
        const data = selectedCategoria !== null
          ? await fetchInstrumentosPorCategoria(selectedCategoria)
          : await fetchInstrumentos();
        setInstrumentos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar instrumentos");
      }
    };
    cargarInstrumentos();
  }, [selectedCategoria]);

  // Eliminar instrumento
  const handleEliminar = async (id: number) => {
    try {
      await deleteInstrumento(id);
      setInstrumentos(prev => prev.filter(instrumento => instrumento.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar instrumento");
    }
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <Titulo texto='Grilla de instrumentos' />
      <Contenedor>
        <div className='filtro-categoria'>
          <div className='contenedor-select-categoria'> {/* Nuevo div contenedor */}
            <label>Filtrar por categoría </label>
            <select
              className="select-form"
              value={selectedCategoria || ''}
              onChange={(e) => setSelectedCategoria(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.denominacion}
                </option>
              ))}
            </select>
          </div>
          {selectedCategoria && (
            <button
              className='boton-limpiar'
              onClick={() => setSelectedCategoria(null)}
            >
              Limpiar filtro
            </button>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>Instrumento</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Precio</th>
              <th>Costo de Envío</th>
              <th>Cantidad Vendida</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {instrumentos.map((instrumento) => (
              <tr key={instrumento.id}>
                <td>{instrumento.instrumento}</td>
                <td>{instrumento.marca}</td>
                <td>{instrumento.modelo}</td>
                <td>${instrumento.precio.toFixed(2)}</td>
                <td>{instrumento.costoEnvio === "G" ? "Gratis" : `$${instrumento.costoEnvio}`}</td>
                <td>{instrumento.cantidadVendida}</td>
                <td>{instrumento.descripcion}</td>
                <td>{instrumento.categoria?.denominacion}</td>
                <td>
                  <div className='acciones'>
                    <button
                      className='boton-modificar'
                      onClick={() => navigate(`/grilla/editar/${instrumento.id}`)}
                    >
                      Modificar
                    </button>
                    <button
                      className='boton-eliminar'
                      onClick={() => handleEliminar(instrumento.id!)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            className='boton-crear'
            onClick={() => navigate('/grilla/crear')}
          >
            Crear Nuevo Instrumento
          </button>
        </div>
      </Contenedor>
    </>
  );
};

export default Grilla;