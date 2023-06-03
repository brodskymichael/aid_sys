import {useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Form, Table, Button, Container, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings, postUsers } from "../redux/actions/index";
import '../styles/Register.css';
import foto from '../assets/signUp.png';
import titulo from '../assets/titulo.png';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';


const Register = () => {
    const dispatch = useDispatch();
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [name, setName] = useState('');
    //const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [surname, setSurname] = useState('');
    const [surnameFocus, setSurnameFocus] = useState(false);

    const [workGroup, setWorkGroup] = useState('');

    const [userType, setUserType] = useState('');

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const settings = useSelector((state) => state.settings);
   

    useEffect(() => {
        dispatch(getSettings())
        //userRef.current.focus();
        //console.log(settings)
       
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        //console.log(result);
        //console.log(user);
        setValidUser(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        //console.log(result);
        //console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(workGroup===""){
            setErrMsg('Select Work Group');
            return false;
        }
        if(userType===""){
            setErrMsg('Select User Type');
            return false;
        }
        let form = {
            user: user,
            name: name,
            surname: surname,
            workGroup: workGroup,
            userType: userType,
            pwd: pwd
        }
        
        try {
            //console.log(form)
            dispatch(postUsers(form))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }

    }
   

    return (
        <>
            {/*settings.new_user*/true?(
                    <Row>
                
                <Col  md={5}>
                <Container>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="text-warning">Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="username">
                                Username:
                                <FontAwesomeIcon icon={faCheck} className={validUser ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validUser || !user ? "hide" : "invalid"} />
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={validUser ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <p id="uidnote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </Form.Group>
                        <Row>
                            <Col  xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label htmlFor="name">
                                        Name:
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="name"
                                        placeholder="First Name"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        required
                                        onFocus={() => setNameFocus(true)}
                                        onBlur={() => setNameFocus(false)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group>
                                    <Form.Label htmlFor="surname">
                                        Sur Name:
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="surname"
                                        placeholder="Sur Name"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setSurname(e.target.value)}
                                        value={surname}
                                        required
                                        onFocus={() => setSurnameFocus(true)}
                                        onBlur={() => setSurnameFocus(false)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                        <Col md={6}>
                        <Form.Group>
                        <Form.Label htmlFor="workgroup">
                            Work Group:
                        </Form.Label>
                        <select
                            className="form-select" 
                            aria-label="Default select example"
                            id="workgroup"
                            ref={userRef}
                            onChange={(e) => setWorkGroup(e.target.value)}
                            value={workGroup}
                            

                        >   
                            <option value="">Select...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        </Form.Group>
                        </Col>
                        <Col md={6}>                     
                        <Form.Group>
                        <Form.Label htmlFor="usertype">
                            User Type:
                        </Form.Label>
                        <select
                            className="form-select" 
                            aria-label="Default select example"
                            id="usertype"
                            ref={userRef}
                            onChange={(e) => setUserType(e.target.value)}
                            value={userType}
                            

                        >   
                            <option value="">Select...</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>

                        </select>
                        </Form.Group>
                        </Col> 
                        </Row>
                        <Form.Group>
                        <Form.Label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label htmlFor="confirm_pwd">
                            Verify Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        </Form.Group>
                        <Form.Group className="container">
                        <br/>
                        <button className="btn " disabled={!validUser || !validPwd || !validMatch ? true : false} >Register Account</button>
                        </Form.Group>
                    </form>
                    <h6>You already have an account?<Link to={'/'} style={{color: '#e14e10'}}> Log in!</Link></h6>
                    </Container>
                    </Col>
                    <Col  md={7}  className="cont-img" >
                    <div>
                        
                        <img src={titulo} alt="" className="img-titulo" />
                        <img src={foto} alt="" className="imgm"/>
                        
                    </div>
                    </Col>
                </Row>
            
            ):
            <h1>Registration disabled at the moment</h1>}
            
            
                    
               
        </>
    )
}
export default Register;