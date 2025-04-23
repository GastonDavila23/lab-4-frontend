import './Instrumentos.sass'
import Card from '../Card/Card.tsx'
import Titulo from '../Titulo/Titulo.tsx'
import { getInstrumentos } from '../../services/FuncionesApi'
import { Instrumento } from '../../types/Instrumento'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

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
        <Container id='instrumentos'>
            <Titulo texto='Instrumentos'  />
            {instrumentos.map(instrumento => (
                <Card key={instrumento.id} instrumento={instrumento} />
            ))}
        </Container>
    )
}

export default Instrumentos