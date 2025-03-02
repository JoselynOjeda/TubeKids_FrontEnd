import React, { useEffect, useState } from "react";
import { obtenerVideos, agregarVideo, eliminarVideo } from "./api";

function App() {
  const [videos, setVideos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [url, setUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    cargarVideos();
  }, []);

  const cargarVideos = async () => {
    const res = await obtenerVideos();
    setVideos(res.data);
  };

  const manejarAgregar = async () => {
    await agregarVideo({ nombre, url, descripcion });
    cargarVideos();
  };

  const manejarEliminar = async (id) => {
    await eliminarVideo(id);
    cargarVideos();
  };

  return (
    <div>
      <h1>Gestión de Videos</h1>
      <input placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="URL" onChange={(e) => setUrl(e.target.value)} />
      <input placeholder="Descripción" onChange={(e) => setDescripcion(e.target.value)} />
      <button onClick={manejarAgregar}>Agregar Video</button>

      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            {video.nombre} - <a href={video.url} target="_blank">Ver</a>
            <button onClick={() => manejarEliminar(video._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
