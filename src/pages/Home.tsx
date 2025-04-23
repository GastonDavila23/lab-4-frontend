import Slider from '../components/Slider/Slider.tsx'
import Nosotros from '../components/Nosotros/Nosotros.tsx'
import Ubicacion from '../components/Ubicacion/Ubicacion.tsx'
import Instrumentos from '../components/Instrumentos/Instrumentos.tsx'


const Home = () => {

    return (
        <>
            <Slider />
            <Nosotros />
            <Ubicacion />
            <Instrumentos />
        </>
    )
}

export default Home