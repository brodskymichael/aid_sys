import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { RequireAuth } from 'react-auth-kit';
import UsersA from './components/A';
import UsersB from './components/B';
import UsersC from './components/C';
import B_magement from './components/B_management';


function App() {

  return (
    
    <BrowserRouter>
      <main className='App'>
      
        <Routes>
          <Route path="/" exact element={ <Register/> } />
          <Route path="/login" exact element={ <Login/> } />
          <Route path='A' excat element={<UsersA/>}/>
          <Route path='B' exact element={<UsersB/>}/>
          <Route path='C' exact element={<UsersC/>}/>
          <Route path='B/management' exact element={<B_magement/>}/>
        </Routes>
      </main>
    </BrowserRouter>
    
  )
}

export default App
