import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Instrumento } from '../../types/Instrumento'
import { Categoria } from '../../types/Categoria'
import Titulo from '../Titulo/Titulo'
import Contenedor from '../Contenedor/Contenedor'
import './Grilla.sass'

const Grilla: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null)
  const navigate = useNavigate()

  // Obtener todos los instrumentos del backend
  useEffect(() => {
    fetch('http://localhost:8080/api/categoria')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // Asegúrate de que las categorías tienen el formato correcto
        setCategorias(data);
      })
      .catch((error) => console.error('Error al obtener las categorías:', error));
  }, []);

  // Obtener los instrumentos del backend según la categoría seleccionada
  useEffect(() => {
    let url = 'http://localhost:8080/api/instrumentos/all';
    if (selectedCategoria !== null) {
      url = `http://localhost:8080/api/instrumentos/categoria/${selectedCategoria}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setInstrumentos(data))
      .catch((error) => console.error('Error al obtener los instrumentos:', error));
  }, [selectedCategoria]);


  // Redirigir a la subruta para crear un nuevo instrumento
  const handleCrear = () => {
    navigate('/grilla/crear');
  };

  // Redirigir a la subruta para modificar un instrumento existente
  const handleEditar = (id: number) => {
    navigate(`/grilla/${id}`);  // Redirige al formulario de edición pasando el ID
  };

  // Eliminar un instrumento
  const handleEliminar = (id: number) => {
    fetch(`http://localhost:8080/api/instrumentos/borrar/${id}`, {
      method: 'DELETE',
    })
      // Validacion para Eliminar
      .then((response) => {
        if (response.ok) {
          setInstrumentos(instrumentos.filter((instrumento) => instrumento.id !== id));
        } else {
          console.error('Error al eliminar el instrumento');
        }
      })
      .catch((error) => console.error('Error al eliminar el instrumento:', error));
  };



  return (
    <>
      <Titulo texto='Grilla de instrumentos' />
      <Contenedor>
        <div className='filtro-categoria'>
          <div>
            <div className='contenedor-categoria'>
              <label>Filtrar por categoría </label>
              <select
                className={"select-form"}
                value={selectedCategoria || ''}
                onChange={(e) => setSelectedCategoria(Number(e.target.value))}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.denominacion}
                  </option>
                ))}
              </select>
            </div>

          </div>
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
                <td>{instrumento.precio}</td>
                <td>{instrumento.costoEnvio}</td>
                <td>{instrumento.cantidadVendida}</td>
                <td>{instrumento.descripcion}</td>
                <td>{instrumento.categoria.denominacion}</td>
                <td >
                  <div className='acciones'>
                    <button className='boton-modificar' onClick={() => handleEditar(instrumento.id!)}>Modificar</button>
                    <button className='boton-eliminar' onClick={() => handleEliminar(instrumento.id!)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button className='boton-crear' onClick={handleCrear}>Crear Nuevo Instrumento</button>
        </div>
      </Contenedor>
    </>

  );
};

export default Grilla;
