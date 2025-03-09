import React, { useState } from 'react';

const Formulario = () => {
  const [inputData, setInputData] = useState(""); // Estado para manejar la entrada del usuario

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    console.log("Datos enviados:", inputData); // Aquí podrías también enviar los datos a una API o algo similar
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="inputData">Introduce algo:</label>
      <input
        type="text"
        id="inputData"
        value={inputData}
        onChange={e => setInputData(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
