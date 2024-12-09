import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MyTickets from './components/MyTickets';
import Dashboard from './components/Dashboard';
import StartJourney from './components/StartJourney';
import CompleteJourney from './components/CompleteJourney';
import Home from './components/Home';
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/my-ticket' element={<MyTickets />}></Route>
        <Route path='/start-journey' element={<StartJourney />}></Route>
        <Route path='/complete-journey' element={<CompleteJourney />}></Route>
      </Routes>
    </Router>
  )
}

export default App
