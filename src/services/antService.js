import axios from "axios";

export const checkANT = async (cedula) => {
  const url = `https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_grid_citaciones.jsp?ps_tipo_identificacion=CED&ps_identificacion=${cedula}&ps_placa=`;
  try {
    const response = await axios.get(url);
    // Procesa la respuesta según lo que devuelva el API de ANT
    return response.data; // Ajusta según el formato del resultado
  } catch (error) {
    console.error("Error al consultar el ANT:", error);
    throw error;
  }
};
