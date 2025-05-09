import { useEffect, useState } from 'react';
import { PedidoResponse } from '../../types/types';
import Titulo from '../Titulo/Titulo';
import './GrillaPedidos.sass';
import Contenedor from '../Contenedor/Contenedor';
import { fetchPedidos } from '../../services/api';

const GrillaPedidos = () => {
    const [pedidos, setPedidos] = useState<PedidoResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargarPedidos = async () => {
            try {
                const data = await fetchPedidos();
                setPedidos(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Error desconocido al cargar pedidos");
                }
            } finally {
                setLoading(false);
            }
        };
        cargarPedidos();
    }, []);

    const formatFecha = (fechaISO: string) => {
        const opciones: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(fechaISO).toLocaleString('es-AR', opciones);
    };

    if (loading) return <div>Cargando pedidos...</div>;
    if (error) return <div className="error-message">{error}</div>;

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
                            {pedido.detalles.map((detalle, index) => (
                                <div key={`${pedido.id}-${index}`} className="detalle-item">
                                    <span>{detalle.instrumento.instrumento}</span>
                                    <div className="detalle-subitem">
                                        <span>Cantidad: {detalle.cantidad}</span>
                                        <span>P/U: ${detalle.precioUnitario.toFixed(2)}</span>
                                        <span>Subtotal: ${(detalle.cantidad * detalle.precioUnitario).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </Contenedor>
    </div>
);
};

export default GrillaPedidos;