// components/ListaPedidos.tsx
import { useEffect, useState } from 'react'
import { Pedido } from '../../types/types'
import Titulo from '../Titulo/Titulo'
import './GrillaPedidos.sass'
import Contenedor from '../Contenedor/Contenedor';
const GrillaPedidos = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
  
    useEffect(() => {
      const fetchPedidos = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/pedido');
          if (!response.ok) throw new Error('Error al cargar pedidos');
          const data: Pedido[] = await response.json();
          setPedidos(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchPedidos();
    }, []);

    const formatFecha = (fechaISO: string) => {
        const opciones: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Argentina/Buenos_Aires',
        };
        return new Date(fechaISO).toLocaleString('es-AR', opciones);
    };

    return (
        <div className="lista-pedidos">
            <Titulo texto='Lista de pedidos' />
            <Contenedor>
                {pedidos.length === 0 ? (
                    <p>No hay pedidos registrados</p>
                ) : (
                    <div className="grilla-pedidos">
                        {pedidos.map((pedido) => (
                            <div key={pedido.id} className="pedido-card">
                                <div className="pedido-header">
                                    <span>Pedido #{pedido.id}</span>
                                    <span>{formatFecha(pedido.fecha)}</span>
                                    <span>Total: ${pedido.total.toFixed(2)}</span>
                                </div>
                                <div className="detalles-pedido">
                                    {pedido.detalles.map((detalle) => (
                                        <div key={detalle.id} className="detalle-item">
                                            <span>{detalle.instrumento.instrumento}</span>
                                            <span>Cantidad: {detalle.cantidad}</span>
                                            <span>Precio unitario: ${detalle.precioUnitario.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Contenedor>
        </div>
    );
};

export default GrillaPedidos;