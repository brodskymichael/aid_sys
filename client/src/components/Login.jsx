import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import {Form, Table, Button, Container, Row, Col} from 'react-bootstrap';
import foto from '../assets/signUp.png';
import titulo from '../assets/titulo.png';
import { getUsers, loginUser, getUserA } from "../redux/actions/index";
import { useDispatch, useSelector } from 'react-redux';
import { useSignIn } from 'react-auth-kit'; 
import { useNavigate } from "react-router-dom";
import UsersA from './A.jsx'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";



const Login = ({socket}) => {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();
    const dispatch = useDispatch();
    const signIn = useSignIn();
    const navigate = useNavigate();
    const allusers = useSelector((state) => state.users);
    let allusersA=[]
    allusers.map((e)=>{
        if(e.userType==="A"){
            allusersA.push(e)
        }
    })

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [sucess, setSuccess] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [userA, setUserA] = useState('');
    const [sucessA, setSuccessA] = useState(false);
    const [breaks, setBreaks] = useState(0);
    const [counter, setCounter] = useState(0);

    const location = useLocation();
   

    /*useEffect(() => {
        userRef.current.focus();
    }, [])*/

    useEffect(() => {
        setErrMsg('');
        dispatch(getUsers())    
    }, [user, pwd])


    const handleSubmit = async (e) => {

        e.preventDefault();
        //console.log(user,pwd);
        let form = {
            user: user,
            pwd: pwd
        }
        
        try{
            let i = await dispatch(loginUser(form))
            //console.log(i.payload.data)
            socket.emit("newLog")
            signIn(
                {
                    token: i.payload.data.token,
                    expiresIn:3600,
                    tokenType: "Bearer",
                    authState: user,
                    refreshToken: i.payload.data.refreshToken,                    // Only if you are using refreshToken feature
                    //refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                }
            )
            
           if(i.payload.data.user.userType==='A') navigate('/A');
           if(i.payload.data.user.userType==='B') navigate('/B');
           if(i.payload.data.user.userType==='C') navigate('/C');
           


            //setUser('');
            setPwd('');
            setSuccess(true);
            setErrMsg('')
        }catch(err){
            setErrMsg('Incorrect Password or Username')
        }
       
            
         
        
    }

    const handleSubmitA = async (e) => {
        e.preventDefault();
        let form = {
            user: user,
            pwd: 'staticpwd'
        }
     
        try{
            let i = await dispatch(loginUser(form))
            socket.emit("newLog")
            signIn(
                {
                    token: i.payload.data.token,
                    expiresIn:3600,
                    tokenType: "Bearer",
                    authState: user,
                    refreshToken: i.payload.data.refreshToken,                    // Only if you are using refreshToken feature
                    //refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                }
            )
            console.log(i.payload.data.user.breaks)
            setBreaks(i.payload.data.user.breaks);
            setCounter( i.payload.data.user.counter)
            
            navigate('/A', {
                state:{
                userName: user,
                breaks: breaks,
                counter: counter
                }
            });
           
            sucessA(true);
   
        }catch(err){
            setErrMsg(err)
        }
        //alert(userA)
    }
    


    return (
        <>
        {sucessA ? (
            
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <a href="#">Go to Home</a>
                </p>
            </section>
        ):(
            
            <Row>
            <Col  md={5}>
                <Container>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="text-warning">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="username">Username:</Form.Label>
                            <Form.Control 
                            type="text" 
                            id="username"
                            placeholder="Enter your username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control 
                        type="password" 
                        id="password"
                        placeholder="*****************"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        />
                        </Form.Group>
                        <Form.Group className="log">
                            <br/>
                            <button className="btn ">Login</button>
                        </Form.Group>
                        
                    </form>
                    {errMsg? 
                    <h6>{errMsg}</h6>:<></>}
                    <form onSubmit={handleSubmitA}>
                    <Form.Group>
                        <br/>
                        <br/>
                        <h1 className="text-warning-medium">Choose User from Group A to login</h1>
                        <Form.Label htmlFor="usersA">
                                Select User:
                            </Form.Label>
                            <select
                                className="form-select" 
                                aria-label="Default select example"
                                id="usersA"
                                placeholder="Select User"
                                ref={userRef}
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required

                            >
                                <option value="">Select User...</option>
                                {
                                    allusersA?.map((e)=>{
                                      
                                        return (<option value={e.user} key={e.name}>{e.name}</option>)
     
                                    })   

                                }                           
                                

                            </select>
                            
                        </Form.Group>
                        <Form.Group className="log">
                            <br/>
                            <button className="btn ">Login</button>
                        </Form.Group>
                        </form>
                <h6>Don't have an account?<Link to={'/'} style={{color: '#e14e10'}}> Sign up!</Link></h6>
                </Container>
                    </Col>
                    <Col  md={7} className="cont-img" >
                        <div >
                        <img src={titulo} alt="" className="img-titulo" />
                        <img src={foto} alt="" className="imgm"/>
                        </div>
                    </Col>
                
            </Row>
       ) }
       </>
    )
}
export default Login;