import { Table, Button, Row, Col, Badge } from 'react-bootstrap';
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
import logouticon from '../assets/logout.svg';
import { logoutUser } from '../redux/actions';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import goodMood from '../assets/goodMood.svg';
import ok from '../assets/ok.svg';
import down from '../assets/down.svg';
import sad from '../assets/sad.svg';
import bad from '../assets/bad.svg';
import redquestion from '../assets/redquestion.svg';
import red_arrow from '../assets/red_arrow.svg';
import Swal from 'sweetalert2';


const UsersB = ({ socket }) => {
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');
    const [search, setSearch] = useState('');
    const [selectedUserA, setSelectedUserA] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allusers = useSelector((state) => state.users);

    let allusersA = []

    let userB = JSON.parse(localStorage.getItem('user'))
    allusers.map((e) => {
        if (e.userType === "A") {
            allusersA.push(e)
        }
    })

    /*allusers.map((e)=>{
        if(e.userType==="B"){
           userB=e
        }
    })*/



    let aux = []
    aux = allusersA
    const [usersA, setUsersA] = useState('');
    const Search = (e) => {
        let filtered = aux.filter((d) =>
            d.user.includes(e.target.value)
        )
        aux = filtered
        setUsersA(aux)
    }

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true)
        setSelectedUserA(e)
    }


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


    const mostrarHora = () => {
        const now = new Date();
        let ora = now.getHours();
        let minutes = now.getMinutes();
        let str = ora + ':' + minutes
        setHora(str)
        //console.log(hora)
    }
    const mostrarFecha = () => {
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        let fecha = hoy.toDateString()
        setFecha(fecha);

    }
    function temporizador() {
        let identificadorTiempoDeEspera = setInterval(mostrarHora, 1000);
        let getusers = setInterval(() => dispatch(getUsers()), 1000);
    }


    const actionBodyTemplate = (e) => {
        //console.log(e)
        return <>
            <button className="boton-send-media" onClick={() => handleShow(e)}>Send Media</button>

        </>;
    };
    const actionBodyTemplate3 = (e) => {
        if (e.login_today == '0') {
            return <>
                <p style={{ color: 'grey' }}>{e.name}</p>
            </>
        }
        if (e.on_break) {
            return <>
                <p style={{ color: 'red' }}>{e.name}</p>
            </>
        }
        if (e.login_today == '1') {
            return <>
                <p style={{ color: 'green' }}>{e.name}</p>
            </>
        }
        if (e.login_today == '2') {
            return <>
                <p style={{ color: 'grey' }}><span style={{ color: 'red' }}>!</span>{e.name}</p>
            </>
        }
        if (e.on_break) {
            return <>
                <p style={{ color: 'red' }}><span style={{ color: 'red' }}>!</span>{e.name}</p>
            </>
        }

    };

    const actionBodyTemplate2 = (e) => {
        if (e.mood == '0') {
            return <>
                <img src={redquestion} />
            </>
        }
        if (e.mood == '1') {
            return <>
                <img src={goodMood} />
            </>
        }
        if (e.mood == '2') {
            return <>
                <img src={ok} />
            </>
        }
        if (e.mood == '3') {
            return <>
                <img src={down} />
            </>
        }
        if (e.mood == '4') {
            return <>
                <img src={sad} />
            </>
        }
        if (e.mood == '5') {
            return <>
                <img src={bad} />
            </>
        }
    };
    const distressTemplate = (e) => {
        if (e.distress) {
            return <img src={red_arrow} height="20px"></img>
        } else {
            return <>
                -
            </>
        }
    };
    const logout = () => {
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
                try {
                    dispatch(logoutUser(userB));
                    socket.emit("newLog")
                    Cookie.remove('_auth');
                    Cookie.remove('_auth_storage');
                    Cookie.remove('_auth_state');
                    Cookie.remove('_auth_type');
                    localStorage.clear();
                    navigate('/')
                } catch (e) {
                    console.log(e)
                }
                //Swal.fire('Saved!', '', 'success')
            }
        })



    }

    useEffect(() => {
        dispatch(getUsers())
        mostrarFecha()
        temporizador()
        //console.log(localStorage.getItem('user'));


    }, [])


    socket.on("RTAchangeMood", function (mood) {
        //console.log('llega')s
        dispatch(getUsers())

    });

    socket.on("RTAlog", function () {
        dispatch(getUsers())
    })
    socket.on("checkDistress", function () {
        dispatch(getUsers())
    })



    return (
        <>

            {userB.login_today != 1 ? (
                <div className='cont-btn-log'>
                    <Link to='/'>
                        <button className="btnLo">Go Login!</button>
                    </Link>
                </div>
            ) : (
                <>
                    <div>
                        <Row>
                            <Col md={3} className='cuerpo-left'>

                                <img src={titulo}></img>
                                <ul>
                                    <br />
                                    <Link to='/B'>
                                        <button className='boton-selected'><img src={brujula} width='25px' height='25px' /> Users</button>
                                    </Link>
                                    <Link to='/B/management'>
                                        <button className='boton-side-bar'><img src={management} width='25px' height='25px' /> Management</button>
                                    </Link>
                                    <Link to='/B/settings'>
                                        <button className='boton-side-bar'><img src={settings} width='25px' height='25px' /> Settings</button>
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
                                        <img src={logouticon} /> Logout
                                    </Button>
                                </ul>
                            </Col>



                            <Col md={9} className='cuerpo'>
                                <div>
                                    <h6>Hi {userB.name},</h6>
                                    <img src={welcome}></img>

                                </div>
                                <br />


                                <div className='contenedor-tabla'>
                                    <input onChange={(e) => Search(e)} placeholder='Search...' className='search-barr'></input>
                                    <Tooltip target=".export-buttons>button" position="bottom" />
                                    <div className='contenedor-filters'>
                                        <button type="button" className='button-export' rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" ><img src={csv} width='30px' height='35px' /></button>
                                        <button type="button" className='button-export' severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" ><img src={excel} width='25px' height='30px' /></button>
                                        <button type="button" className='button-export' severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" ><img src={pdf} width='25px' height='30px' /></button>
                                    </div>
                                    <DataTable ref={dt} value={usersA ? usersA : allusersA} tableStyle={{ minWidth: '100%' }} className="table">
                                        <Column body={actionBodyTemplate3} header="Name" className='colum'></Column>
                                        <Column field="breaks" header="Breaks" className='colum'></Column>
                                        <Column field="counter" header="Counter" className='colum'></Column>
                                        <Column body={actionBodyTemplate2} header='Mood' exportable={false} className='colum'></Column>
                                        <Column body={distressTemplate} header='Distress' className='colum'></Column>
                                        <Column body={actionBodyTemplate} exportable={false} className='colum'></Column>
                                    </DataTable>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <ModalUsersB show={show} handleClose={handleClose} userB={userB} userA={selectedUserA} socket={socket} />
                </>
            )}
        </>
    )
}
export default UsersB;