import React, { useState } from "react";
import { checkSRI } from "../services/sriService";
import { checkANT } from "../services/antService";

const CedulaForm = () => {
  const [cedula, setCedula] = useState("");
  const [sriStatus, setSriStatus] = useState(null);
  const [antStatus, setAntStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSriStatus(null);
    setAntStatus(null);

    try {
      const sriResponse = await checkSRI(cedula);
      setSriStatus(sriResponse ? "Contribuyente registrado" : "No es contribuyente del SRI");

      const antResponse = await checkANT(cedula);
      setAntStatus(antResponse || "No se encontraron puntos en la licencia");
    } catch (err) {
      setError("Hubo un error al procesar las solicitudes. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Verificación de Cédula</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese su cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Consultando..." : "Consultar"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {sriStatus && <p>SRI: {sriStatus}</p>}
      {antStatus && <p>ANT: {antStatus}</p>}
    </div>
  );
};

export default CedulaForm;
