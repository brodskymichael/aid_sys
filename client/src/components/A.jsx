import taza from '../assets/taza.svg';
import welcome from '../assets/welcomeBack.svg';
import ask from '../assets/ask.svg';
import finger from '../assets/finger.svg';
import titulo from '../assets/titulo.svg';
import logouticon from '../assets/logout.svg';
import { Button, Row, Col, Badge} from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import '../styles/A.css';
import { useState, useEffect } from 'react';
import { logoutUser, updateStates, updateStatesBreak, getUserA } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie';
import Example from './ModalEmojis';





const UsersA = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(0);
    const [breaks, setBreaks] = useState(0)
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');
    const [usuario, setUsuario] = useState({counter:0})

    const navigate = useNavigate();
    //console.log(usuario)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUsuarioA = async()=>{
        setUsuario(await dispatch(getUserA({name:location.state.userName})));

    }
  
   
    const click =() => {
        let cont = counter + 1
        setCounter(cont)
        let info = {
            user:location.state,
            counter: counter
        }
        dispatch(updateStates(info));
    }
    const clickBreak = () => {
        setBreaks(breaks+1)
        let info = {
            user:location.state,
            breaks: breaks
        }
        dispatch(updateStatesBreak(info));
    }
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
        if(fecha.includes('20:0')){
            setBreaks(0);
            setCounter(0);
        }
        setFecha(fecha);

    }

    const logout =() =>{
        try{
            dispatch(logoutUser());
            Cookie.remove('_auth');
            Cookie.remove('_auth_storage');
            Cookie.remove('_auth_state');
            Cookie.remove('_auth_type')
            navigate('/login')
        }catch(e){
            console.log(e)
        }
       
    }

    function temporizador() {
        let identificadorTiempoDeEspera = setInterval(mostrarHora, 1000);
    }
   
    
    useEffect(() => {
        mostrarFecha();
        //temporizador()
        handleShow();
       
    },[hora, fecha])

    useEffect(()=>{
        
     getUsuarioA()
        
    },[])
    useEffect(()=>{
        setCounter(usuario.counter)
        setBreaks(usuario.breaks)
    },[usuario])
   

    return(
        <>
            <div>
            <Row>
                <Col md={4}>
                    <img src={titulo}></img>
                </Col>
                <Col md={4}>
                    <h6>Hi {location.state.userName},</h6>
                    <img src={welcome}></img>
                    
                </Col>
                <Col md={4}> 
                    <span className="badge badge-secondary">
                        <h1 className="text-warning-medium">Next Event</h1>
                    </span>
                    <br/>
                    <h6>Morning break at 10:00</h6>
                </Col>

            </Row>
            <br/>
            <div className="card">
            <div className="card-body">
            <Row className='rowB'>
                <Col  className='colB'>
                    
                    
                    <Button className='divWhite' onClick={clickBreak}>
                        <h3 className='blacktext'>Break</h3>
                        <img src={taza}></img>
                    </Button>
                   
                    
                </Col>
                <Col className='colB'>
                    
                
                    <Button className='divWhite' onClick={click}>
                        <h3 className='blacktext'>{counter}</h3>
                        <img src={finger}></img>
                    </Button>
                    
                  
                </Col>
            
            </Row>
            </div>
            </div>
            <br/>
            <div className='pad'>
            <Row className='ult'>
            <Col>
                <Button className="btnA ">
                    <img src={ask}/> Call for help  
                </Button>
            </Col>
            <Col>
                <Button className="btnA ">
                    <h5>{hora}</h5>
                    <h6>{fecha}</h6>
                </Button>
            </Col>
            <Col>
            <Button className="btnA " onClick={logout}>
                <img src={logouticon}/> Logout  
            </Button>
            </Col>

            </Row>
            </div>
            
        </div>
        <Example show={show} handleClose={handleClose} usuario={usuario}/> 

        </>
        
        
    )
}
export default UsersA;










