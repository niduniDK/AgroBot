import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Details from './pages/details'
import Login from './pages/login'
import Register from './pages/register'
import VirtualAssistant from './pages/virtualassistant'
import Chat from './pages/chat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/disease_details' element={<Details/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/virtual_assistant' element={<VirtualAssistant/>}></Route>
          <Route path='/chat' element={<Chat/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
