export const getInstrumentosJSON = async () => {
    const response = await fetch('/services/instrumentos.json');
    const data = await response.json();
    return data.instrumentos;
};