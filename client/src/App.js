import './App.css';
import {Route, useLocation} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Nav from './components/Nav/Nav';


function App() {




let location = useLocation()

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav/>}
      <Routes>
       <Route path = '/' element = {<LandingPage/>}/>
       <Route path = '/home' element = {<Home/>}/>
       <Route path = '/Detail/:id' element = {<Detail />}/>
       <Route path ='/Form' element = {<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
