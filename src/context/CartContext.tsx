import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Instrumento, CarritoItem, CartContextType } from "../types/types"
import { v4 as uuidv4 } from "uuid"

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Cargar el carrito desde el localStorage al iniciar
  const [carrito, setCarrito] = useState<CarritoItem[]>(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Guardar el carrito en el localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (instrumento: Instrumento) => {
    const instrumentoId = instrumento.id ?? Number(uuidv4().slice(0, 8)); // Genera un id temporal si no está definido

    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === instrumentoId);
      if (existe) {
        // Si el instrumento ya está en el carrito, aumenta la cantidad
        return prev.map((p) =>
          p.id === instrumentoId ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        // Si el instrumento no está en el carrito, agrégalo con cantidad 1
        return [...prev, { ...instrumento, id: instrumentoId, cantidad: 1 }];
      }
    });
  };

  const modificarCantidad = (id: number, cantidad: number) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: cantidad <= 0 ? 0 : cantidad }
            : item
        )
        .filter((item) => item.cantidad > 0) // Elimina el producto si la cantidad es 0
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
        limpiarCarrito,
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