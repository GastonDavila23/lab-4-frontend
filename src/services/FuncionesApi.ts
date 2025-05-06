// así usamos instrumentos.js desde el front
// export const getInstrumentosJSON = async () => {
//     const response = await fetch('/services/instrumentos.json');
//     const data = await response.json();
//     return data.instrumentos;
// };

const BACKEND_ENDPOINT = 'http://localhost:8080/api/instrumentos';

export const getInstrumentos = async () => {
  const response = await fetch(`${BACKEND_ENDPOINT}/all`);
  if (!response.ok) throw new Error("Error al obtener instrumentos");
  return await response.json();
};

export const getInstrumentoById = async (id: number) => {
  const response = await fetch(`${BACKEND_ENDPOINT}/id/${id}`);
  if (!response.ok) throw new Error("Instrumento no encontrado");
  return await response.json();
};

