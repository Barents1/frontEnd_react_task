import React, { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';


import '../css/shared.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const navigate = useNavigate();
    // creaciòn de un objeto de tipo Cookie
    const cookies = new Cookies();

    // eliminaciòn de las cookies cuando el usuario cierra sesion
    const cerrarSesion=()=>{
        cookies.remove('id',{path:"/"});
        cookies.remove('lastname',{path:"/"});
        cookies.remove('firstname',{path:"/"});
        cookies.remove('username',{path:"/"});
        cookies.remove('email',{path:"/"});
        cookies.remove('token',{path:"/"});
        window.location.href='./'
    }
    
    // hooks que ayuda a ver si el usuario no ha cerrado sesion
    useEffect(() => {
        if (!cookies.get('username')) {
            window.location.href="./"
        }
    }, [])

    
    const user = cookies.get('username');

    // contenido del navbar
        return (
            <>
                <div >
                    <div >
                        <nav className="navbar navbar-expand-lg bg-light">
                            <div className="container-fluid">
                                    <a className="navbar-brand" >{user}</a>
                                <a className="navbar-brand" onClick={()=> navigate('/menu')}>Home</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" onClick={()=> navigate('/task')}>Tareas</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => cerrarSesion()}>Logout</a>
                                    </li>
                                </ul>
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </>
        );
    
}

export default Navbar;