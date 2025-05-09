import './Slider.sass';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Instrumento } from '../../types/types';
import { fetchInstrumentos } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Titulo from '../Titulo/Titulo';
import Contenedor from '../Contenedor/Contenedor';

const Slider = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const cargarInstrumentos = async () => {
      try {
        const data = await fetchInstrumentos();
        setInstrumentos(data);
      } catch (error) {
        console.error('Error al cargar instrumentos:', error);
      }
    };
    cargarInstrumentos();
  }, []);

  const instrumentosParaSlider = instrumentos.slice(0, 3);

  return (
    <Contenedor>
      <Titulo texto='Los mejores instrumentos' />
      <Carousel
        className='slider'
        prevIcon={<FontAwesomeIcon icon={faChevronLeft} className="custom-arrow" />}
        nextIcon={<FontAwesomeIcon icon={faChevronRight} className="custom-arrow" />}
      >
        {instrumentosParaSlider.length > 0 ? (
          instrumentosParaSlider.map((instrumento) => (
            <Carousel.Item key={instrumento.id}>
              <div className='slider-image-contenedor'>
                <img
                  className="d-block w-100"
                  src={`./images/${instrumento.imagen}`}
                  alt={instrumento.instrumento}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <Carousel.Caption>
                <h3>{instrumento.instrumento}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <div className='text-center p-5'>
              <p>No hay instrumentos disponibles</p>
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    </Contenedor>
  );
};

export default Slider;