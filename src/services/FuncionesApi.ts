// así usamos instrumentos.js desde el front
// export const getInstrumentosJSON = async () => {
//     const response = await fetch('/services/instrumentos.json');
//     const data = await response.json();
//     return data.instrumentos;
// };

const API_URL = 'http://localhost:8080/api/instrumentos/all';

export const getInstrumentos = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener instrumentos");
  return await response.json();
};

export const getInstrumentoById = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Instrumento no encontrado");
  return await response.json();
};

