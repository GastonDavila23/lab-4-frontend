import { useState, useEffect } from 'react'
import Card from '../components/Card/Card.tsx'
import { getInstrumentosJSON } from '../services/FuncionesApi.ts'

const Instrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<any[]>([]);

  const getInstrumentosResto = async () => {
    let datos = await getInstrumentosJSON();
    setInstrumentos(datos);
  };

  useEffect(() => {
    getInstrumentosResto();
  }, []);

  return (
    <div className="app">
      <h1 className='d-flex justify-content-center m-5 text-uppercase' style={{ color: '#197278' }}>Instrumentos Musicales</h1>
      <div className="card-list">
        {instrumentos.map(instrumento => (
          <Card
            key={instrumento.id}
            instrumentoImagen={instrumento.imagen}
            instrumentoTitulo={instrumento.instrumento}
            instrumentoPrecio={instrumento.precio}
            instrumentoEnvio={instrumento.costoEnvio}
            instrumentoVendidos={instrumento.cantidadVendida}
          />
        ))}
      </div>
    </div>
  )
};

export default Instrumentos;