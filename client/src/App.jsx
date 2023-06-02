import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { RequireAuth } from 'react-auth-kit';
import UsersA from './components/A';
import UsersB from './components/B';
import UsersC from './components/C';
import B_magement from './components/B_management';
import C_magement from './components/C_management';
import C_settings from './components/C_settings';
import B_settings from './components/B_settings';
import socketIO from "socket.io-client";


const socket = socketIO.connect("http://localhost:9000");

function App() {

  

  return (
    
    <BrowserRouter>
      <main className='App'>
      
        <Routes>
          <Route path="/" exact element={ <Login socket={socket}/> } />
          <Route path="/register" exact element={ <Register /> } />
          <Route path='A' excat element={<UsersA socket={socket}/>}/>
          <Route path='B' exact element={<UsersB socket={socket}/>}/>
          <Route path='C' exact element={<UsersC socket={socket}/>}/>
          <Route path='B/management' exact element={<B_magement socket={socket}/>}/>
          <Route path='B/settings' exact element={<B_settings socket={socket}/>}/>
          <Route path='C/management' exact element={<C_magement socket={socket}/>}/>
          <Route path='C/settings' exact element={<C_settings socket={socket}/>}/>
          
          
        </Routes>
      </main>
    </BrowserRouter>
    
  )
}

export default App
