import { Table, Button, Row, Col, Badge, FormCheck} from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { getSettings, getUsers, updateSettings, updateSettingsNewUser } from "../redux/actions/index";
import { useDispatch, useSelector } from 'react-redux';
import welcome from '../assets/welcomeBack.svg';
import addUser from '../assets/addUser.svg';
import download from '../assets/download.svg';
import filter from '../assets/filter.svg';
import titulo from '../assets/titulo.svg';
import brujula from '../assets/brujula.svg';
import management from '../assets/management.svg';
import settingss from '../assets/settings.svg';
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
import logouticon from '../assets/logout.svg';
import { logoutUser} from '../redux/actions';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';





const B_settings = ({socket}) => {
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allusers = useSelector((state) => state.users);
    const settings = useSelector((state) => state.settings);
    
    
    let allusersA=[]
    
    let userB = JSON.parse(localStorage.getItem('user'))

    allusers.map((e)=>{
        if(e.userType==="A"){
            allusersA.push(e)
        }
    })
 
    /*allusers.map((e)=>{
        if(e.userType==="B"){
          
           userB= e
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
       
    }

    
    const changeNewUser = () => {
        const radioButtons = document.querySelector('input[name="formHorizontalRadios"]');
        if(settings.new_user){
            //let deleteduser = document.querySelector('input[name="formHorizontalRadios"]:checked');
            Swal.fire({
                title: 'Disable new user registration?',
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
              }).then(async(result) => {
                if (result.isConfirmed) {
                    let new_user = false
                    await dispatch(updateSettingsNewUser({new_user:new_user}))
                  Swal.fire('Saved!', '', 'success')
                }else{
                    document.getElementById('register-checkbox').checked = true
                }

              })
              
           
            //console.log(deleteduser)  
        }else{
            Swal.fire({
                title: 'Enable new user registration?',
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
              }).then(async(result) => {
                if (result.isConfirmed) {
                    let new_user = true
                    await dispatch(updateSettingsNewUser({new_user:new_user}))
                  Swal.fire('Saved!', '', 'success')
                }else{
                    document.getElementById('register-checkbox').checked = false
                }
              })

        }

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
                    dispatch(logoutUser(userB));
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

    const [errors, setErrors] = useState('')
    const SubmitSettings = async() =>{
        //console.log('llego')
        let sampling_cycle =  document.getElementById('sampling_cycle').value;
        let count_ref_number =  document.getElementById('count_ref_number').value;
        console.log(count_ref_number)
        console.log(sampling_cycle)
        let settings = {
            sampling_cycle:sampling_cycle,
            count_ref_number:count_ref_number
        }
        if(sampling_cycle != '' && count_ref_number != ''){
            await dispatch(updateSettings(settings))
            setErrors('')
            return alert('Settings Updated')   
        }else{
            setErrors('both fields are required')
        }
        

    }
    
    useEffect(() => {
        dispatch(getUsers())
        mostrarFecha()
        temporizador()
    },[fecha, hora,usersA, errors])
    useEffect(() => {
        dispatch(getSettings())
       
    },[])
    useEffect(() => {
        console.log(settings)
        let check = document.getElementById('register-checkbox')
        if(check && settings && settings.new_user){
            check.checked=true
        }else if(check){

            check.checked=false
        }
    },[settings])
   

    return(
        <>
            {userB.login_today!=1?(
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
                        <Link to= '/B'>
                        <button className='boton-side-bar'><img src={brujula} width='25px' height='25px'/> Users</button>
                        </Link>
                        <Link to= '/B/management'>
                        <button className='boton-side-bar'><img src={management} width='25px' height='25px'/> Management</button>
                        </Link>
                        <Link to= '/B/settings'>
                        <button className='boton-selected'><img src={settingss} width='25px' height='25px'/> Settings</button>   
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
                        <Form.Group className='sett'>
                            <h6>Sampling Cycle:</h6>
                            <input id='sampling_cycle' type="number" min='1' className='sett-inp' placeholder={settings.sampling_cycle}></input>
                            <h6>User Count Reference:</h6>
                            <input id='count_ref_number' type="number" min='1' className='sett-inp' placeholder={settings.count_ref_number}></input>
                        </Form.Group>
                        <input
                            type="checkbox"
                            name="formHorizontalRadios"
                            id="register-checkbox"
                            onChange={changeNewUser}
                        />New user's registration available
                        </div>
                        <button className="update-botton"  onClick={SubmitSettings}>
                            Update Settings  
                        </button>
                        {errors!=''?
                            <p>{errors}</p>:<></>
                        }
                    
                    </Col>
                        
                    </Row>
                </div> 
                </>
            )}
        </>
    )
}
export default B_settings;