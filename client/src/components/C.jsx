import { Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { getHistory, getUserA, getUsers } from "../redux/actions/index";
import { useDispatch, useSelector } from 'react-redux';
import titulo from '../assets/titulo.svg';
import brujula from '../assets/brujula.svg';
import management from '../assets/management.svg';
import settings from '../assets/settings.svg';
import lupa from '../assets/lupa.svg';
import '../styles/B_management.css';
import Cookie from 'js-cookie';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from "react-router-dom";
import logouticon from '../assets/logout.svg';
import { logoutUser} from '../redux/actions';
import { useNavigate } from "react-router-dom";
import goodMood from '../assets/goodMood.svg';
import ok from '../assets/ok.svg';
import down from '../assets/down.svg';
import sad from '../assets/sad.svg';
import bad from '../assets/bad.svg';
import redquestion from '../assets/redquestion.svg';

import red_arrow from '../assets/red_arrow.svg';
import Swal from 'sweetalert2';



const UsersC = ({socket}) => {
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allusers = useSelector((state) => state.users);
    const [showTableToday, setShowTableToday] = useState(true);
    const [history, setHistories] = useState([]);
    
    let allusersA=[]
    
    let userC = JSON.parse(localStorage.getItem('user'))

    allusers.map((e)=>{
        if(e.userType==="A"){
            allusersA.push(e)
        }
    })
 
   /* allusers.map((e)=>{
        if(e.userType==="C"){
           userC=e
        }
    })*/
 
    
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

    
    const logout =() =>{
        Swal.fire({
            title: 'Are you sure you want to logout?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap',
              confirmButton: 'order-2',
              denyButton: 'order-3',
            }
          }).then((result) => {
            if (result.isConfirmed) {
                try{
                    dispatch(logoutUser(userC));
                    socket.emit("newLog")
                    Cookie.remove('_auth');
                    Cookie.remove('_auth_storage');
                    Cookie.remove('_auth_state');
                    Cookie.remove('_auth_type');
                    localStorage.clear();
                    navigate('/')
                }catch(e){
                    console.log(e)
                }
              //Swal.fire('Saved!', '', 'success')
            }
          })
          

       
    }
    const actionBodyTemplate = (e) => {
        if(e.mood== '0'){
            return <>
            <img src={redquestion}/>            
            </>
        }
        if(e.mood == '1'){
            return <>
            <img src={goodMood}/>            
            </>
        }
        if(e.mood == '2'){
            return <>
            <img src={ok}/>            
            </>
        }
        if(e.mood == '3'){
            return <>
            <img src={down}/>            
            </>
        }
        if(e.mood == '4'){
            return <>
            <img src={sad}/>            
            </>
        }
        if(e.mood == '5'){
            return <>
            <img src={bad}/>            
            </>
        }
       
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
    
    const distressTemplate = (e) => {
        if(e.distress){
            return <img src={red_arrow} height="20px"></img>
        }else{
            return <>
            -          
            </>
        }
    };
    
    useEffect(() => {
        dispatch(getUsers())
        mostrarFecha()
        temporizador()
       
        
    },[fecha, hora,usersA])

    socket.on("RTAlog", function(){
        dispatch(getUsers())
    })
    socket.on("checkDistress", function(){
        dispatch(getUsers())
    })

    const today = new Date();
    const date = today.setDate(today.getDate()); 
    const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd

    const changeDate = async(e)=>{
        console.log(e)
        if(e!=defaultValue){
            let histories = await dispatch(getHistory({day:e}))
            /*histories.map(async (h)=>{
                let id = h.user
                console.log(id)
                let userA = await dispatch(getUserA(id))
                h.user='hola'
            })
            */
            setHistories(histories)
            setShowTableToday(false)
            console.log(histories)
        }else{
            setShowTableToday(true)
        }
    }


    return(
        <>
            {userC.login_today!=1?(
                <div className='cont-btn-log'>
                <Link to= '/'>
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
                        <Link to= '/C'>
                        <button className='boton-selected'><img src={brujula} width='25px' height='25px'/> Users</button>
                        </Link>
                        <Link to= '/C/management'>
                        <button className='boton-side-bar'><img src={management} width='25px' height='25px'/> Management</button>
                        </Link>
                        <Link to= '/C/settings'>
                        <button className='boton-side-bar'><img src={settings} width='25px' height='25px'/> Settings</button>
                        </Link>   
                    </ul>
                    <ul>
                        <Button className="btnA">
                            <h5>{hora}</h5>
                            <h6>{fecha}</h6>
                        </Button>
                        <input type="date" style={{margin:'50px 0px'}} defaultValue={defaultValue} max={defaultValue} onChange={(e)=>changeDate(e.target.value)} className='calendar'></input>
                    </ul>
                    <ul>
                        <Button className="btnA " onClick={logout}>
                            <img src={logouticon}/> Logout  
                        </Button>
                    </ul>
                    </Col>
                    <Col md={9} className='cuerpo-m'>
                        <div>
                            <h2  className='saludo'>Hello {userC.name}!</h2>
                            <h6>So exited and happy to have you back!</h6>
                        </div>
                        <br/>
                        <div className='contenedor-tabla'>
                            <input onChange={(e)=>Search(e)} placeholder='Search...' className='search-bar'></input>
                            {showTableToday?
                                <DataTable ref={dt} value={usersA?usersA:allusersA} tableStyle={{ minWidth: '100%'}} className="table">
                                    <Column body={actionBodyTemplate3} header="User" className='colum'></Column>
                                    <Column field="breaks" header="Breaks"  className='colum'></Column>
                                    <Column field="counter" header="Counter"  className='colum'></Column>
                                    <Column body={distressTemplate} header="Distress"  className='colum'></Column>
                                    <Column body={actionBodyTemplate} exportable={false}   header="Mood" className='colum'></Column>
                                </DataTable>
                                :
                                <DataTable ref={dt} value={history?history:[]} tableStyle={{ minWidth: '100%'}} className="table">
                                    <Column field="username" header="User" className='colum'></Column>
                                    <Column field="breaks" header="Breaks"  className='colum'></Column>
                                    <Column field="counter" header="Counter"  className='colum'></Column>
                                    <Column field="work_time" header="Work Time (mins)"  className='colum'></Column>
                                    <Column field="break_time" header="Break Time (mins)"  className='colum'></Column>
                                </DataTable>
                            }
                        </div>
                    </Col>
                
                    </Row>
                </div> 
                </>
            )}
        </>
    )
}
export default UsersC;