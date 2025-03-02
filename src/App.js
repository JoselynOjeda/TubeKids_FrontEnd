import React, { useEffect, useState } from "react";
import { obtenerVideos, agregarVideo, eliminarVideo } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

const API_URL = "http://localhost:5000/api/videos"; // Asegúrate de que coincida con tu backend

function App() {
  const [videos, setVideos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [url, setUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarVideos();
  }, []);

  const cargarVideos = async () => {
    try {
      const res = await obtenerVideos();
      console.log("Datos recibidos:", res.data);
      setVideos(res.data);
    } catch (error) {
      console.error("Error cargando videos:", error);
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando datos:", { editando, nombre, url, descripcion });

    if (!nombre || !url) {
      alert("El nombre y la URL son obligatorios.");
      return;
    }

    try {
      if (editando) {
        // Verifica que el ID es correcto antes de enviar
        console.log("Actualizando video con ID:", editando);
        await axios.put(`http://localhost:5000/api/videos/${editando}`, { nombre, url, descripcion });
      } else {
        await axios.post("http://localhost:5000/api/videos", { nombre, url, descripcion });
      }
      limpiarFormulario();
      cargarVideos();
    } catch (error) {
      console.error("Error al agregar/actualizar el video:", error);
      alert("Hubo un problema al guardar el video.");
    }
  };

  const manejarEditar = (video) => {
    console.log("Editando video con ID:", video._id);
    setEditando(video._id);
    setNombre(video.nombre);
    setUrl(video.url);
    setDescripcion(video.descripcion);
  };

  const manejarEliminar = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      cargarVideos();
    } catch (error) {
      console.error("Error eliminando video:", error);
    }
  };

  const limpiarFormulario = () => {
    setEditando(null);
    setNombre("");
    setUrl("");
    setDescripcion("");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Gestión de Videos</h1>
      <form className="card p-4 mb-4" onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Nombre del video"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          placeholder="URL del video (YouTube)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="form-control mb-2"
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="form-control mb-2"
        ></textarea>
        <button className="btn btn-primary w-100">
          {editando ? "Actualizar Video" : "Agregar Video"}
        </button>
      </form>

      <div className="row">
        {videos.map((video) => (
          <div key={video._id} className="col-md-4 mb-4">
            <div className="card">
              <iframe
                className="card-img-top"
                src={video.url.replace("watch?v=", "embed/")}
                title={video.nombre}
                allowFullScreen
              ></iframe>
              <div className="card-body">
                <h5 className="card-title">{video.nombre}</h5>
                <p className="card-text">{video.descripcion}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning" onClick={() => manejarEditar(video)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => manejarEliminar(video._id)}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
