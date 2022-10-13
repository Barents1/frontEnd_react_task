import React, { Component } from 'react';
import Navbar from '../shareComponents/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Menu from './Menu';
import TaskList from './TaskList';

class Contenedor extends Component {

    

    // contenido del navbar y de las rutas hijas para poder navegar sin que se desborde la pagina

    render() {
        return (
            <>
                <Navbar />
                <Routes>
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/task" element={<TaskList />} />
                </Routes>
            </>
        );
    }
}

export default Contenedor;