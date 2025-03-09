import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import GestorVideos from "./Components/GestorVideos"; // Asumiendo que el código de videos está en este archivo
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [category, setCategory] = useState(0);

  return (
    <BrowserRouter>
      <Navbar setSidebar={setSidebar} />
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className="content">
        <GestorVideos />
        {/* Aquí puedes incluir otros componentes o rutas según necesites */}
      </div>
    </BrowserRouter>
  );
};

export default App;
