import './App.css';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import DashBoard from './Components/DashBoard';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm></LoginForm>}></Route>
        <Route path='/signup' element={<SignupForm></SignupForm>}></Route>
        <Route path='/dashBoard' element={<DashBoard></DashBoard>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
