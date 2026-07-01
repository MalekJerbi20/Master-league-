import './App.css'
import PlayerCard from './components/playerCard.jsx'
import TeamGenerator from './components/teamGenerator.jsx'
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import AddPlayer from './components/addPlayer.jsx'
import Players from './components/players.jsx'
import Teams from './components/teams.jsx'
import Navbar from './components/navbar.jsx'
import Login from './components/login.jsx'
import Signup from './components/signup.jsx'
import FormationPage from './components/FormationPage.jsx'
import Pitch from './components/pitch.jsx'
import Profile from './components/profile.jsx'
function App() {
 


  return (
    
    <>
    <Navbar/>
      <Routes>
        <Route path="/addPlayer" element={<AddPlayer/>}/>
        <Route path="/players" element={<Players/>}/>
        <Route path="/teams" element={<Teams/>}/>
        <Route path="/teamGenerator" element={<TeamGenerator/>}/>
        <Route path="/playerCard" element={<PlayerCard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/' element={<Signup/>}></Route>
        <Route path="/formation" element={<FormationPage/>}/>
        <Route path='/pitch' element={<Pitch/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </>

  )
}

export default App
