import { Table, Button, Row, Col, Badge} from 'react-bootstrap';
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
import '../styles/B.css';
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


const B_management = () => {
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');
    const [search, setSearch] = useState('');
    
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

    const cols = [
        { field: 'name', header: 'Name' },
        { field: 'breaks', header: 'Breaks' },
        { field: 'counter', header: 'Counter' }
    ];
    

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };
   

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, allusersA);
                doc.save('data.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(allusersA);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'data');
        });
    };
    
   
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

    const actionBodyTemplate = (e) => {
        return <>
            <button className="boton-send-media" onClick={handleShow}>Send Media</button>
            <ModalUsersB show={show} handleClose={handleClose}/>
                                    
        </>;
    };
   
    
    useEffect(() => {
        dispatch(getUsers())
        mostrarFecha()
        //temporizador()
       
        
    },[fecha, hora,usersA])


    return(
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
                    <input onChange={(e)=>Search(e)}></input>
                    <Tooltip target=".export-buttons>button" position="bottom" />
                    <div className='contenedor-filters'>
                        <button type="button" className='button-export' rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" ><img src={csv} width='30px' height='35px'/></button>
                        <button type="button" className='button-export' severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" ><img src={excel} width='25px' height='30px'/></button>
                        <button type="button" className='button-export' severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" ><img src={pdf} width='25px' height='30px'/></button>
                    </div>
                    <DataTable ref={dt} value={usersA?usersA:allusersA} tableStyle={{ minWidth: '100%'}} className="table">
                        <Column field="name" header="Name" className='colum'></Column>
                        <Column field="breaks" header="Breaks"  className='colum'></Column>
                        <Column field="counter" header="Counter"  className='colum'></Column>
                        <Column body={actionBodyTemplate} exportable={false}  className='colum'></Column>
                    </DataTable>
                </div>
            </Col>
            </Row>
        </div> 
     
        </>
    )
}
export default B_management;