import Contenedor from '../Contenedor/Contenedor'
import Titulo from '../Titulo/Titulo';
import './Ubicacion.sass'

const Ubicacion = () => {
  return (
    <>
      <Contenedor>
        <Titulo texto='Encontranos en' />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.3169282834388!2d-58.452248124460944!3d-34.545530172975255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb43ae6018ddf%3A0x3d7f60a75bfa308a!2sEstadio%20Monumental!5e0!3m2!1ses-419!2sar!4v1744680373925!5m2!1ses-419!2sar"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Contenedor>
    </>
  );
};

export default Ubicacion;