import { Table, Button, Row, Col, Badge, FormCheck} from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
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
import '../styles/B_management.css';
import Form from 'react-bootstrap/Form';
import logoutGris from '../assets/logoutGris.svg';
import Cookie from 'js-cookie';
import ModalUsersB from './modalUsersB';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import excel from '../assets/excel.svg'
import pdf from '../assets/pdf.svg';
import csv from '../assets/csv.svg';
import { Link } from "react-router-dom";
import { InputSwitch } from 'primereact/inputswitch';
import logouticon from '../assets/logout.svg';
import { logoutUser, deleteUser} from '../redux/actions';

import { useNavigate } from "react-router-dom";




const B_management = ({socket}) => {
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allusers = useSelector((state) => state.users);
    
    let allusersA=[]
    
    let userB = {}
    allusers.map((e)=>{
        if(e.userType==="A"){
            allusersA.push(e)
        }
    })
 
    allusers.map((e)=>{
        if(e.userType==="B"){
           userB = e
        }
    })
 
    
    let aux = []
    aux=allusersA
    const [usersA, setUsersA] = useState('');
    const Search = (e)=>{
       let filtered= aux.filter((d)=>
            d.user.includes(e.target.value)
        )
        aux=filtered
        setUsersA(aux)
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   
    const dt = useRef(null);

   
   
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
    const deleter = (e)=>{
       let deleteduser= document.getElementById('formHorizontalRadios1').value
       console.log(deleteduser)
       dispatch(deleteUser({_id:deleteduser}))
       dispatch(getUsers())
        
    }

    const actionBodyTemplate = (e) => {
        return <>
            <Form.Check
              type="radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              value={e._id}
            />
        </>;
    };
    const actionBodyTemplate3 = (e) => {
        if(e.login_today == '0'){
            return <>
            <p style={{color: 'grey'}}>{e.name}</p>            
            </>
        }
        if(e.on_break){
            return <>
            <p style={{color: 'red'}}>{e.name}</p>            
            </>
        }
        if(e.login_today == '1'){
            return <>
            <p style={{color:'green'}}>{e.name}</p>            
            </>
        }
        if(e.login_today == '2'){
            return <>
            <p style={{color: 'grey'}}><span style={{color: 'red'}}>!</span>{e.name}</p>            
            </>
        }
        if(e.on_break){
            return <>
            <p style={{color: 'red'}}><span style={{color: 'red'}}>!</span>{e.name}</p>            
            </>
        }
        
    };
    const logout =() =>{
        //console.log(usersB[0])
        try{
            dispatch(logoutUser(userB));
            socket.emit("newLog")
            Cookie.remove('_auth');
            Cookie.remove('_auth_storage');
            Cookie.remove('_auth_state');
            Cookie.remove('_auth_type')
            navigate('/login')
        }catch(e){
            console.log(e)
        }
       
    }
    

    
    useEffect(() => {
        dispatch(getUsers())
        mostrarFecha()
        //temporizador()
       
        
    },[fecha, hora,usersA, allusers])

    socket.on("RTAlog", function(){
        dispatch(getUsers())
    })

    return(
        <>
            {userB.login_today!=1?(
                <div className='cont-btn-log'>
                <Link to= '/login'>
                <button className="btnLo">Go Login!</button>
                </Link>
                </div>
            ):(
                <>
                <div>
                    <Row>
                    <Col md={3} className='cuerpo-left'>

                    <img src={titulo}></img>
                    <ul>
                        <br/>
                        <Link to= '/B'>
                        <button className='boton-side-bar'><img src={brujula} width='25px' height='25px'/> Users</button>
                        </Link>
                        <button className='boton-selected'><img src={management} width='25px' height='25px'/> Management</button>
                        <Link to= '/B/settings'>
                        <button className='boton-side-bar'><img src={settings} width='25px' height='25px'/> Settings</button>
                        </Link>   
                    </ul>
                    <ul>
                        <Button className="btnA">
                            <h5>{hora}</h5>
                            <h6>{fecha}</h6>
                        </Button>
                        
                        
                    </ul>
                    <ul>
                        <Button className="btnA " onClick={logout}>
                            <img src={logouticon}/> Logout  
                        </Button>
                    </ul>
                    </Col>

                

                    <Col md={9} className='cuerpo-m'>
                        <div>
                            <h2  className='saludo'>Hello {userB.name}!</h2>
                            <h6>So exited and happy to have you back!</h6>
                        </div>
                        <br/>
                        <div className='contenedor-tabla'>
                            <input onChange={(e)=>Search(e)} placeholder='Search...' className='search-bar'></input>
                            <DataTable ref={dt} value={usersA?usersA:allusersA} tableStyle={{ minWidth: '100%'}} className="table">
                            <Column body={actionBodyTemplate} exportable={false}  className='colum'></Column>
                                <Column body={actionBodyTemplate3}  header="User" className='colum'></Column>
                                <Column field="workGroup" header="User Group"  className='colum'></Column>
                            </DataTable>
                            
                        </div>
                        <button className="boton-delete" onClick={deleter}>
                            Delete selected user  
                        </button>
                    
                    </Col>
                
                    </Row>
                </div> 
                </> 
            )}
        </>
    )
}
export default B_management;