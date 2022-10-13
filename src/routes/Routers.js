import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Contenedor from "../pages/Contenedor";
import  Login  from '../pages/Login';
import Menu from "../pages/Menu";
import TaskList from "../pages/TaskList";

// rutas para dirigirse segun si esta o no logueado

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/*" element={<Contenedor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
