import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../css/shared.css';

const cookies = new Cookies();



class Menu extends Component {


    firstname = cookies.get('firstname');
    lastname = cookies.get('lastname');


    render() {

        
        return (
            <>
                <div className='container'>
                    <link href='https://fonts.googleapis.com/css?family=Exo:400,900' rel='stylesheet' type='text/css' />
                    <div class="wrapper">
                        <div class="message">
                            <h1>Bienvenido { this.firstname }</h1>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Menu;