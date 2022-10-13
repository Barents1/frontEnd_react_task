import React, { Component } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Cookies from 'universal-cookie';

import { apiUrl } from '../services/baseUrl';

import '../css/shared.css';
import "bootstrap/dist/css/bootstrap.min.css";


// creación de objeto cookies
const cookies = new Cookies();

class TaskList extends Component {

    user_id = cookies.get('id');
    token = cookies.get('token');
    // header = `Authorization: Bearer ${this.token}`;

    // estado para los inputs
    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
          id: '',
          description: '',
          finish: '',
          user_id: '',
          tipoModal: ''
        }
      }

    // peticion para obtener los datos de la api segun el usuario logeado
    peticionGet=()=>{
        axios.get(apiUrl.API_URL+`task/${this.user_id}`, { headers: { "Authorization":`Bearer ${this.token}` } }).then(response=>{
            this.setState({data: response.data});
            console.log(response);
        }).catch(error=>{
            console.log(error.message);
        })
    }

    // peticion para crear tareas 
    peticionPost=async()=>{
        delete this.state.form.id;
       await axios.post(apiUrl.API_URL+`task/`,this.state.form, { headers: { "Authorization":`Bearer ${this.token}` } }).then(response=>{
          this.modalInsertar();
          // recargamos automaticamente la pagina
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
      }

    
    // función para actualizar
    peticionPut=()=>{
        console.log(this.state.form.id);
        axios.put(apiUrl.API_URL+`task/`+this.state.form.id, this.state.form, { headers: { "Authorization":`Bearer ${this.token}` } }).then(response=>{
            // abrir modal
            this.modalInsertar();
            this.peticionGet();
        })
    }
    
    // función para eliminar una tarea
    peticionDelete=()=>{
        axios.delete(apiUrl.API_URL+`task/`+this.state.form.id, { headers: { "Authorization":`Bearer ${this.token}` } }).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();
        })
    }
    
    // función para ver el modal segun la opciòn solicitada
    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
    }


    seleccionarTask=(task)=>{
        this.setState({
          tipoModal: 'actualizar',
          form: {
            id: task.id,
            description: task.description,
            finish: task.finish,
            user_id: task.user_id
          }
        })
      }

    // evento para el cambio de datos en los campos
    handleChange=async e=>{
        e.persist();
        await this.setState({
            form:{
            ...this.state.form,
            [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
      }

    render() {

        
        //desestructuraciòn de de informaciòn de los formularios(campos)
        const {form}=this.state;
        return (
            <div class="wrapper">
                <div class="message2">
                    <button className="btn btn-success"  onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Tarea</button>
                    <br />
                    <div class="message2">
                        <table className="table">
                            <thead class="message2">
                                <tr>
                                <th  >ID</th>
                                <th>Descripción</th>
                                <th>fecha</th>
                                <th>usuario</th>
                                <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="message2">
                                {this.state.data.map(task=>{
                                return(
                                    <tr>
                                <td>{task.id}</td>
                                <td>{task.description}</td>
                                <td>{task.finish}</td>
                                <td>{task.user_id}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>{this.seleccionarTask(task); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                    {"   "}
                                    <button className="btn btn-danger" onClick={()=>{this.seleccionarTask(task); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                    </td>
                                </tr>
                                )
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    
                    <Modal isOpen={this.state.modalInsertar}>
                        <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                        </ModalHeader>
                        <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                            <br />
                            <label htmlFor="description">Tarea</label>
                            <input className="form-control" type="text" name="description" id="description" onChange={this.handleChange} value={form?form.description: ''}/>
                            <br />
                            <label htmlFor="finish">Finalización</label>
                            <input className="form-control" type="text" name="finish" id="finish" onChange={this.handleChange} value={form?form.finish: ''}/>
                            <br />
                            <label htmlFor="user_id">Usuario</label>
                            <input className="form-control" type="text" name="user_id" id="user_id" onChange={this.handleChange} value={form?form.user_id: `${this.user_id}`}/>
                        </div>
                        </ModalBody>

                        <ModalFooter>
                        {this.state.tipoModal=='insertar'?
                            <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                            Insertar
                        </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                            Actualizar
                        </button>
        }
                            <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                        </ModalFooter>
                    </Modal>


                    <Modal isOpen={this.state.modalEliminar}>
                        <ModalBody>
                        Estás seguro que deseas eliminar la tarea {form && form.description}
                        </ModalBody>
                        <ModalFooter>
                        <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                        </ModalFooter>
                    </Modal>


                </div>
            </div>
        );
    }
}

export default TaskList;