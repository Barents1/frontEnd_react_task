import React, { Component } from 'react';
import { apiUrl } from '../services/baseUrl';
import axios from 'axios';

// cookies
import Cookies from 'universal-cookie';



import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// creación de objeto cookies
const cookies = new Cookies();


class Login extends Component {

    // estado para formularios 
    state={
        form:{
            email:'',
            password:''
        }
    };

    // evento para el cambio de los inputs
    handleChange = async e => {
        await this.setState({
            // desestructuración para las variables
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);

    }



    // para logearse 
    login=async() => {
        console.log(this.state.form.email,);
        await fetch(apiUrl.API_URL+'login/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            
            body:JSON.stringify({
                email:this.state.form.email,
                password:this.state.form.password
            })
        })
        .then(res=>{
            return res.json();
        })
        .then(result=>{
            // console.log(result.token);
            if (result.status !== '400' ) {
                cookies.set('token', result.token, {path:"/"} )
                let resul = result.user[0];
                cookies.set('id', resul.id, {path:"/"});
                cookies.set('lastname', resul.lastname, {path:"/"});
                cookies.set('firstname', resul.firstname, {path:"/"});
                cookies.set('username', resul.username, {path:"/"});
                cookies.set('email', resul.email, {path:"/"});
                alert('Bienvenido '+resul.username);
                window.location.href="./menu"

            }else{
                alert('Credenciales Invalidas')
            }
            
        },(error)=>{
            console.log(error);
        })
    }


    componentDidMount(){
        if (cookies.get('username')) {
            window.location.href="./*"
        }
    }


    render() {
        return (
            <div className='containerPrincipal'>
                <div className='containerSecundario'>
                    <div className='form-group'>
                        <label>Usuario: </label>
                        <br />
                        <input 
                            type="text"
                            className="form-control"
                            name="email"
                            onChange={this.handleChange}
                        />
                        <br/>
                        <label>Contraseña: </label>
                        <br/>
                        <input 
                            type='password'
                            className='form-control'                        
                            name='password'
                            onChange={this.handleChange}
                        />
                        <br />
                        <button className='btn btn-primary' onClick={() => this.login()}>Iniciar Sesión</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;