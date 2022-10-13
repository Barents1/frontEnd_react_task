import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Contenedor from "../pages/Contenedor";
import  Login  from '../pages/Login';
import Menu from "../pages/Menu";
import TaskList from "../pages/TaskList";



function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/*" element={<Contenedor />} />
        {/* <Route path="/menu" element={<Menu />} />
        <Route path="/task" element={<TaskList />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
