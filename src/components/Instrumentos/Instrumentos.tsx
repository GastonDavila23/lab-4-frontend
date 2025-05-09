import './Instrumentos.sass'
import Card from '../Card/Card.tsx'
import Titulo from '../Titulo/Titulo.tsx'
import { fetchInstrumentos } from '../../services/api.ts'
import { Instrumento } from '../../types/types'
import { useState, useEffect } from 'react'
import Contenedor from '../Contenedor/Contenedor.tsx'

const Instrumentos = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchInstrumentos();
                setInstrumentos(data);
            } catch (error) {
                setError("Error al cargar instrumentos"); 
                console.error("Error cargando instrumentos:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Cargando instrumentos...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <>
            <Titulo texto='Listado de instrumentos' /> {/* Nombre más descriptivo */}
            <Contenedor className='contendor-instrumentos'>
                {instrumentos.map(instrumento => (
                    <Card key={instrumento.id} instrumento={instrumento} />
                ))}
            </Contenedor>
        </>
    )
}

export default Instrumentos