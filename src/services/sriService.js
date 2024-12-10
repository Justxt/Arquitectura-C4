import axios from "axios";

export const checkSRI = async (cedula) => {
  const url = `https://srienlinea.sri.gob.ec/sri-catastro-sujeto-servicio-internet/rest/ConsolidadoContribuyente/existePorNumeroRuc?numeroRuc=${cedula}`;
  try {
    const response = await axios.get(url);
    return response.data; // Asume que el API retorna true o false
  } catch (error) {
    console.error("Error al consultar el SRI:", error);
    throw error;
  }
};
