import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Instrumento, CarritoItem, CartContextType } from "../types/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<CarritoItem[]>(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (instrumento: Instrumento) => {
    // Validar que el instrumento tenga ID
    if (!instrumento.id) {
      throw new Error("El instrumento no tiene un ID válido");
    }

    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === instrumento.id);
      if (existe) {
        return prev.map((p) =>
          p.id === instrumento.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        // Mapear solo las propiedades necesarias
        return [...prev, {
          id: instrumento.id,
          instrumento: instrumento.instrumento,
          precio: instrumento.precio,
          cantidad: 1,
          imagen: instrumento.imagen
        }];
      }
    });
  };

  const modificarCantidad = (id: number, cantidad: number) => {
    setCarrito((prev) =>
        prev
            .map((item) =>
                item.id === id ? { ...item, cantidad: Math.max(0, cantidad) } : item
            )
            .filter((item) => item.cantidad > 0)
    );
};

const eliminarItem = (id: number) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
};

const limpiarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider 
        value={{ 
            carrito, 
            agregarAlCarrito, 
            modificarCantidad, 
            eliminarItem, 
            limpiarCarrito
        }}
    >
        {children}
    </CartContext.Provider>
);
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};