import taza from '../assets/taza.svg';
import welcome from '../assets/welcomeBack.svg';
import ask from '../assets/ask.svg';
import finger from '../assets/finger.svg';
import titulo from '../assets/titulo.svg';
import logouticon from '../assets/logout.svg';
import { Button, Row, Col, Badge} from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import '../styles/A.css';
import { useState, useEffect } from 'react';
import { logoutUser, updateStates, updateStatesBreak, getUserA, getreceivedmsg, markSeen, getUsers, updateBreakFalse } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie';
import Example from './ModalBreak';
import ModalEmojis from './ModalEmojis';
import Messages from './modalMsg';
import bell from '../assets/bell.svg';
import Swal from 'sweetalert2';



const UsersA = ({socket}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(0);
    const [breaks, setBreaks] = useState(0)
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');
    const [usuario, setUsuario] = useState({counter:0});
    const [messages, setMessages] = useState({messages:''});
    const users = useSelector((state) => state.users);
    const [cookies, setCookies] = useState('');

    const navigate = useNavigate();
    //console.log(usuario)

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const handleClose = async () =>{

        setShow(false);
        dispatch(updateBreakFalse({user:location.state, userid: usuario._id, rt:usuario.reference_time,  bt:usuario.break_time, breaks:usuario.breaks}))
        socket.emit("newLog")
          
    } 
    const handleShow = () => setShow(true);
 
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => {setShow2(true)};

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => {setShow3(true)};

    const getUsuarioA = async()=>{
        let usuarioA = await dispatch(getUserA({name:location.state.userName}));
        setUsuario(usuarioA)
        if(usuarioA.on_break) handleShow(true);
    }
  
   
    const click =() => {
        let cont = counter + 1
        setCounter(cont)
        let info = {
            user:location.state,
            counter: counter
        }
        dispatch(updateStates(info));
        socket.emit("newLog")
    }
    const clickBreak = () => {

        setBreaks(breaks+1)
        let info = {
            user:location.state,
            breaks: breaks,
            userid: usuario._id,
            rt:usuario.reference_time,
            wt:usuario.work_time
        }
        handleShow();
        dispatch(updateStatesBreak(info));
        
        //handleClose()
        socket.emit("newLog")
    }
    const mostrarHora = () =>{
        const now = new Date();
        let ora= now.getHours();
        let minutes= now.getMinutes();
        let str = ora+':'+minutes
        setHora(str)
        //console.log(hora)
    }
    const mostrarFecha = () =>{
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        let fecha = hoy.toDateString()

        setFecha(fecha);

    }

    const logout =async () =>{
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
            }
          }).then((result) => {
            if (result.isConfirmed) {
                try{
                    dispatch(logoutUser({_id:usuario._id}));
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

    function temporizador() {
        let identificadorTiempoDeEspera = setInterval(mostrarHora, 1000);
    }
   
    const getMessages = async () =>{
        if(usuario._id){
            let mecha = await dispatch(getreceivedmsg({id:usuario._id}))
            console.log(mecha.payload.data)
            setMessages(mecha.payload.data)  
        }
    }
    const getUnseenMessages = async ()=>{
        if(messages && messages.length){
            for (var i = 0; i < messages.length; i++) {
                if (!messages[i].seen) {
                    console.log(messages[i])
                  handleShow2()
                  break;
                }
            }
            messages.map(async (e)=>{
                if(!e.seen){
                    console.log(e)
                    await dispatch(markSeen({id_msg:e._id}))
                } 
            })
        }
    }
    useEffect(() => {
        mostrarFecha();
        temporizador()
        //handleShow();
        //getMessages()  
        //dispatch(getreceivedmsg({id:usuario._id}))
       
    },[hora, fecha])

    useEffect(()=>{
        getUsuarioA()
        dispatch(getUsers())
        
    },[])

      
    useEffect(()=>{
        setCounter(usuario.counter)
        setBreaks(usuario.breaks)

        if(usuario && usuario.questionPending){
            //console.log(usuario)
            handleShow3()
        } 
        getMessages()
        getUnseenMessages()
     
        
    },[usuario])

    socket.on("sendMessage",async function(msg){
        console.log(msg);
        if(msg.receptorid==usuario._id){
            handleShow2()
            await dispatch(markSeen({id_msg:msg._id}))
        }
        getMessages()
        getUnseenMessages()
        
    });

    socket.on("changeMood", function(user){
        //console.log("socket working on the frontend: ", msg);
        if(usuario._id == user.user){
            console.log(usuario)
            handleShow3()
        } 
  
    });


    return(
        
        <>
            {usuario.login_today!=1 && usuario.userType!='A'?(
                <div className='cont-btn-log'>
                <Link to= '/'>
                <button className="btnLo">Go Login!</button>
                </Link>
                </div>
            ):(
            <>
            <div className='contenedor-A'>
            <Row>
                <Col md={3}>
                    <img src={titulo}></img>
                </Col>
                <Col md={8}>
                    <h6>Hi {location.state.userName},</h6>
                    <img src={welcome}></img>
                    
                    
                </Col>
               
                <Col md={1}>
                    <button onClick={handleShow2} className='bell'><img src={bell} width='40px' height='40px'></img></button>
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
            <h1></h1>
        </div>
        <Example show={show} handleClose={handleClose} usuario={usuario}/> 
        <Messages show={show2} handleClose={handleClose2} messages={messages} users={users} style={{width:'85vw', height:'85vh'}}/>
        <ModalEmojis show={show3} handleClose={handleClose3} usuario={usuario._id} socket={socket} />
        </>)}
        </>
        
        
    )
}
export default UsersA;










