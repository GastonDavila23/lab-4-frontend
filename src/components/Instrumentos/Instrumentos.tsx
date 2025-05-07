import './Instrumentos.sass'
import Card from '../Card/Card.tsx'
import Titulo from '../Titulo/Titulo.tsx'
import { getInstrumentos } from '../../services/FuncionesApi'
import { Instrumento } from '../../types/types'
import { useState, useEffect } from 'react'
import Contenedor from '../Contenedor/Contenedor.tsx'

const Instrumentos = () => {

    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInstrumentos();
                setInstrumentos(data);
            } catch (error) {
                console.error("Error cargando instrumentos:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Titulo texto='Cards de instrumentos' />
            <Contenedor className='contendor-instrumentos'>
                {instrumentos.map(instrumento => (
                    <Card key={instrumento.id} instrumento={instrumento} />
                ))}
            </Contenedor>
        </>
    )
}

export default Instrumentos