import { Table, Button, Row, Col, Badge} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getUsers } from "../redux/actions/index";
import { useDispatch, useSelector } from 'react-redux';
import welcome from '../assets/welcomeBack.svg';
import addUser from '../assets/addUser.svg';
import download from '../assets/download.svg';
import filter from '../assets/filter.svg';
import titulo from '../assets/titulo.svg';
import brujula from '../assets/brujula.svg';
import management from '../assets/management.svg';
import settings from '../assets/settings.svg';
import lupa from '../assets/lupa.svg';
import '../styles/B.css';
import Form from 'react-bootstrap/Form';
import logoutGris from '../assets/logoutGris.svg';
import Cookie from 'js-cookie';


const UsersB = () => {
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');
    const dispatch = useDispatch();
    const allusers = useSelector((state) => state.users);
    let allusersA=[]
    let usersB = []
    allusers.map((e)=>{
        if(e.userType==="A"){
            allusersA.push(e)
        }
    })
    allusers.map((e)=>{
        if(e.userType==="B"){
           usersB.push(e)
        }
    })
    
   
    const mostrarHora = () =>{
        const now = new Date();
        let ora= now.getHours();
        let minutes= now.getMinutes();
        let str = ora+':'+minutes
        setHora(str)
        console.log(hora)
    }
    const mostrarFecha = () =>{
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        let fecha = hoy.toDateString()
        setFecha(fecha);

    }
    function temporizador() {
        let identificadorTiempoDeEspera = setInterval(mostrarHora, 1000);
        let getusers= setInterval(dispatch(getUsers()), 1000);
    }

    useEffect(() => {
        dispatch(getUsers())
        mostrarFecha()
        //temporizador()
        
    },[fecha, hora])


    return(
        
        <div>
            <Row>
            <Col md={3} className='cuerpo-left'>
            <img src={titulo}></img>
            <ul>
                <br/>
                <button className='boton-side-bar'><img src={brujula} width='25px' height='25px'/> Users</button>
                <button className='boton-side-bar'><img src={management} width='25px' height='25px'/> Management</button>
                <button className='boton-side-bar'><img src={settings} width='25px' height='25px'/> Users</button>
                
                
            </ul>
            <ul>
                <Button className="btnA">
                    <h5>{hora}</h5>
                    <h6>{fecha}</h6>
                </Button>
                
                
            </ul>
            <ul>
                <button className='boton-logout'>
                    logout <img src={logoutGris} width='25px' height='25px'/>
                </button>
            </ul>
            </Col>
            <Col md={9} className='cuerpo'>
                <div>
                    <h6>Hi {usersB.map((e)=>{return(e.name)})},</h6>
                    <img src={welcome}></img>
                    
                </div>
                <br/>
                <div>
                    <Row>
                        <Col> <h6>Users</h6></Col>
                        <Col><button className="btn"><img src={addUser} width='25px' height='25px'/>  Add User</button></Col>
                    </Row>
                </div>
                <br/>
                <div className='contenedor-tabla'>
                    <Row className='contenedor-head'>
                        <Col md={8}><th><img src={lupa} className="lupa"/></th><th><input placeholder='Search...' className='search-bar'/></th></Col>
                        <Col md={2}><Form.Select size="sm"><option>Export</option></Form.Select></Col>
                        <Col md={2}><Form.Select size="sm"><option>Filter</option></Form.Select></Col>
                        
                    </Row>
                    <Table className="table">
                        <thead>
                            <tr>
                                <th className='titulo-tabla'>Name</th>
                                <th className='titulo-tabla'>Break</th>
                                <th className='titulo-tabla'>Counter</th>
                                <th className='titulo-tabla'>Mood</th>
                                <th className='titulo-tabla'>Distress</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allusersA?.map((e)=>{
                                    return(
                                    <tr key={e.id}>
                                    <td>{e.name}</td>
                                    <td>{e.breaks}</td>
                                    <td>{e.counter}</td>
                                    <td>Mood</td>
                                    <td>Distress</td>
                                    <td><button className="boton-send-media">Send Media</button></td>
                                    </tr>
                                    )
                                })
                            }
                        
                        </tbody>
                    </Table>
                </div>
            </Col>
            </Row>
        </div>
    )
}
export default UsersB;