import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const API_URL = "http://localhost:5000/api/videos"; // Asegúrate de que coincida con tu backend

function App() {
  const [videos, setVideos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [url, setUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarVideos();
  }, []);

  const cargarVideos = async () => {
    try {
      const res = await axios.get(`${API_URL}?q=${busqueda}`);
      setVideos(res.data);
    } catch (error) {
      console.error("Error cargando videos:", error);
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !url) {
      alert("El nombre y la URL son obligatorios.");
      return;
    }

    try {
      if (editando) {
        await axios.put(`${API_URL}/${editando}`, { nombre, url, descripcion });
      } else {
        await axios.post(API_URL, { nombre, url, descripcion });
      }
      limpiarFormulario();
      cargarVideos();
    } catch (error) {
      console.error("Error al agregar/actualizar el video:", error);
      alert("Hubo un problema al guardar el video.");
    }
  };

  const manejarEditar = (video) => {
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

  const manejarBuscar = (e) => {
    e.preventDefault();
    cargarVideos();
  };

  const limpiarFormulario = () => {
    setEditando(null);
    setNombre("");
    setUrl("");
    setDescripcion("");
  };

  return (
    <div className="container-fluid">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Gestión de Videos</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Videos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Playlist</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Salir</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* FORMULARIO DE BÚSQUEDA */}
      <div className="row mt-3">
        <div className="col-md-12">
          <form onSubmit={manejarBuscar} className="form-inline mb-3">
            <input
              type="text"
              className="form-control mr-sm-2"
              placeholder="Buscar videos"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
          </form>
        </div>
      </div>

      {/* FORMULARIO DE AÑADIR VIDEOS */}
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card p-4 mb-4">
            <h5 className="text-center">{editando ? "Actualizar Video" : "Agregar Video"}</h5>
            <form onSubmit={manejarSubmit}>
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
          </div>
        </div>
      </div>

      {/* LISTA DE VIDEOS */}
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
